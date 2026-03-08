const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * El Escriba en la Nube con Soporte de Antelación por Evento
 * Se ejecuta cada minuto para revisar si hay alarmas pendientes
 */
exports.chroniconWatchman = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const now = new Date();
    const db = admin.firestore();

    // 1. Obtener todos los dispositivos registrados para saber a quién notificar
    let userTokensMap = {}; // userId -> [tokenIds]
    try {
        const tokenSnapshot = await db.collection('user_tokens').get();
        tokenSnapshot.docs.forEach(doc => {
            const data = doc.data();
            const uid = data.userId || 'legacy'; // 'legacy' para tokens antiguos sin userId
            if (!userTokensMap[uid]) userTokensMap[uid] = [];
            userTokensMap[uid].push(doc.id);
        });
    } catch (err) {
        console.error("Error leyendo user_tokens:", err);
        return null;
    }

    if (Object.keys(userTokensMap).length === 0) {
        console.log("No hay dispositivos registrados.");
        return null;
    }

    // 2. Definir los márgenes posibles de antelación
    const margins = [0, 5, 10, 15, 30, 60];

    // Mapa para agrupar mensajes por usuario: userId -> [alarmDetails]
    let notificationsByUser = {};

    for (const am of margins) {
        const watchTime = new Date(now.getTime() + (am * 60000));

        // Formatear hora y fecha para el momento del evento (Watch Time) en Europe/Madrid
        const watchMin = new Intl.DateTimeFormat('es-ES', {
            timeZone: 'Europe/Madrid',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(watchTime);

        const parts = new Intl.DateTimeFormat('es-ES', {
            timeZone: 'Europe/Madrid',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(watchTime);

        const year = parts.find(p => p.type === 'year').value;
        const month = parts.find(p => p.type === 'month').value;
        const day = parts.find(p => p.type === 'day').value;
        const watchDateStr = `${year}-${month}-${day}`;

        try {
            const calendarDayDoc = await db.collection('calendar_events').doc(watchDateStr).get();
            if (calendarDayDoc.exists) {
                const events = calendarDayDoc.data().events || [];

                // Filtrar eventos que tienen alarma programada justo para este momento considerando su propia antelación
                const activeAlarms = events.filter(e =>
                    e.isAlarm &&
                    e.time === watchMin &&
                    (e.advanceMinutes || 0) === am
                );

                activeAlarms.forEach(alarm => {
                    const prefix = am > 0 ? `🔔 [En ${am} min] ` : "🔔 ";
                    const alarmText = `${prefix}${alarm.time} - ${alarm.text.replace(/<[^>]*>/g, '').trim()}`;

                    // Identificar destinatarios: autor + compartidos
                    let dests = new Set();
                    if (alarm.authorId) dests.add(String(alarm.authorId));
                    if (alarm.sharedWith && Array.isArray(alarm.sharedWith)) {
                        alarm.sharedWith.forEach(uid => dests.add(String(uid)));
                    }

                    // Si no hay autor ni compartidos (migración o error), enviamos a todos como fallback de seguridad
                    // O si queremos mantener el comportamiento de "broadcast" anterior si así lo prefiere el usuario.
                    // Pero según "determinado para cada evento", lo lógico es por usuario.
                    if (dests.size === 0) {
                        // Enviar a todos los usuarios registrados
                        Object.keys(userTokensMap).forEach(uid => {
                            if (!notificationsByUser[uid]) notificationsByUser[uid] = [];
                            notificationsByUser[uid].push(alarmText);
                        });
                    } else {
                        dests.forEach(uid => {
                            if (!notificationsByUser[uid]) notificationsByUser[uid] = [];
                            notificationsByUser[uid].push(alarmText);
                        });
                    }
                });
            }
        } catch (err) {
            console.error(`Error procesando margen ${am}min para ${watchDateStr}:`, err);
        }
    }

    // 3. Enviar las notificaciones acumuladas por usuario
    for (const [userId, alarms] of Object.entries(notificationsByUser)) {
        const tokens = userTokensMap[userId];
        if (!tokens || tokens.length === 0) continue;

        const combinedBody = alarms.join(' | ');

        const message = {
            notification: {
                title: "📜 Crónica del Reino",
                body: combinedBody,
            },
            android: {
                priority: "high",
                notification: {
                    channelId: "chronicon_alerts",
                    icon: "ic_notification",
                    color: "#8B0000",
                    sound: "default"
                }
            },
            apns: {
                payload: {
                    aps: {
                        alert: {
                            title: "📜 Crónica del Reino",
                            body: combinedBody,
                        },
                        sound: "default",
                        badge: 1
                    }
                }
            },
            tokens: tokens,
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log(`Usuario ${userId}: ${response.successCount} avisos enviados.`);

            // Limpieza de tokens inválidos
            if (response.failureCount > 0) {
                response.responses.forEach(async (resp, idx) => {
                    if (!resp.success) {
                        await db.collection('user_tokens').doc(tokens[idx]).delete().catch(() => { });
                    }
                });
            }
        } catch (sendErr) {
            console.error(`Error enviando a usuario ${userId}:`, sendErr);
        }
    }

    return null;
});
