const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * El Escriba en la Nube
 * Se ejecuta cada minuto para revisar si hay alarmas pendientes
 */
exports.chroniconWatchman = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const now = new Date();

    // Obtener hora y fecha en horario de España
    const madridTime = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);

    // Formato YYYY-MM-DD
    const parts = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).formatToParts(now);

    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const madridDate = `${year}-${month}-${day}`;

    console.log(`Revisando crónicas para ${madridDate} a las ${madridTime}`);

    const db = admin.firestore();
    let alarmsToSend = [];

    // 1. Revisar eventos fijos del día
    try {
        const calendarDayDoc = await db.collection('calendar_events').doc(madridDate).get();
        if (calendarDayDoc.exists) {
            const events = calendarDayDoc.data().events || [];
            events.forEach(e => {
                // Si tiene alarma activada y coincide la hora exacta
                if (e.isAlarm && e.time === madridTime) {
                    alarmsToSend.push(e.text || "Asunto pendiente");
                }
            });
        }
    } catch (err) {
        console.error("Error leyendo calendar_events:", err);
    }

    // 2. Si no hay alarmas, terminar
    if (alarmsToSend.length === 0) {
        console.log("No hay alarmas para este minuto.");
        return null;
    }

    // 3. Obtener tokens de todos los dispositivos registrados
    let tokens = [];
    try {
        const tokenSnapshot = await db.collection('user_tokens').get();
        tokens = tokenSnapshot.docs.map(doc => doc.id);
    } catch (err) {
        console.error("Error leyendo user_tokens:", err);
    }

    if (tokens.length === 0) {
        console.log("No hay dispositivos registrados para avisar.");
        return null;
    }

    // 4. Enviar notificaciones push
    const message = {
        notification: {
            title: "📜 Crónica del Reino",
            body: alarmsToSend.join(' | '),
        },
        android: {
            priority: "high",
            notification: {
                channelId: "chronicon_alerts",
                priority: "high",
                visibility: "public",
                sound: "default"
            }
        },
        apns: {
            payload: {
                aps: {
                    alert: {
                        title: "📜 Crónica del Reino",
                        body: alarmsToSend.join(' | '),
                    },
                    sound: "default",
                    badge: 1,
                    contentAvailable: true
                }
            }
        },
        tokens: tokens,
    };

    try {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Avisos enviados con éxito: ${response.successCount}`);

        // Limpiar tokens inválidos si los hay
        if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokenSnapshot.docs[idx].id);
                }
            });

            // Borrado asíncrono de tokens muertos
            for (const t of failedTokens) {
                await db.collection('user_tokens').doc(t).delete();
            }
        }
    } catch (err) {
        console.error("Error enviando mensajería:", err);
    }

    return null;
});
