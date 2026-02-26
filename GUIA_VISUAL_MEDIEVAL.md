# 📜 GUÍA VISUAL COMPLETA - ESTILO MEDIEVAL
## Resumen Detallado de Colores, Tipografías y Estilos Visuales

---

## 🎨 1. PALETA DE COLORES (Variables CSS)

### Colores Principales
```css
:root {
    /* Fondos - Pergamino */
    --parchment: #F4E4BC;           /* Pergamino claro (fondo principal) */
    --parchment-dark: #E8D5A3;       /* Pergamino oscuro (tarjetas, elementos) */
    
    /* Textos - Tinta */
    --iron-gall: #1A1A1A;           /* Tinta de hierro (texto principal) */
    --ink-black: #0A0A0A;            /* Negro tinta (texto muy oscuro) */
    
    /* Acentos - Metales Preciosos */
    --gold-leaf: #D4AF37;            /* Hoja de oro (bordes, acentos) */
    --cinnabar: #8B2635;             /* Cinabrio rojo (encabezados, títulos) */
    --lapis-lazuli: #1E3A8A;         /* Lapislázuli azul (botones, elementos importantes) */
    
    /* Tonos Tierra - Sepia */
    --sepia: #704214;                /* Sepia oscuro (textos secundarios) */
    --ocher: #CC7722;                /* Ocre (gradientes, fondos) */
}
```

### Colores Adicionales (Gradientes y Variaciones)
```css
/* Gradientes de Header */
--header-gradient-start: #8B2635;    /* Cinnabar */
--header-gradient-end: #6B1F2A;     /* Cinnabar oscuro */

/* Gradientes de Navegación */
--nav-gradient-start: #704214;      /* Sepia */
--nav-gradient-end: #CC7722;        /* Ocre */

/* Gradientes de Mes/Navegación */
--month-nav-start: #1E3A8A;         /* Lapis lazuli */
--month-nav-end: #152A5E;           /* Lapis lazuli oscuro */

/* Gradientes de Botones */
--btn-gradient-start: #1E3A8A;       /* Lapis lazuli */
--btn-gradient-end: #152A5E;        /* Lapis lazuli oscuro */
```

### Colores con Transparencia (RGBA)
```css
/* Fondos semitransparentes */
--gold-overlay-light: rgba(212, 175, 55, 0.2);    /* Oro claro 20% */
--gold-overlay-medium: rgba(212, 175, 55, 0.4);   /* Oro medio 40% */
--gold-overlay-hover: rgba(212, 175, 55, 0.15);   /* Oro hover 15% */

/* Fondos de modal */
--modal-backdrop: rgba(0, 0, 0, 0.7);              /* Fondo oscuro 70% */

/* Efectos de sombra */
--shadow-light: rgba(0, 0, 0, 0.1);                /* Sombra ligera */
--shadow-medium: rgba(0, 0, 0, 0.2);               /* Sombra media */
--shadow-dark: rgba(0, 0, 0, 0.3);                 /* Sombra oscura */
--shadow-strong: rgba(0, 0, 0, 0.5);               /* Sombra fuerte */

/* Efectos de resaltado */
--cinnabar-glow: rgba(139, 38, 53, 0.4);          /* Resplandor rojo */
--cinnabar-bg: rgba(139, 38, 53, 0.1);            /* Fondo rojo claro */
--parchment-fade: rgba(244, 228, 188, 0.5);       /* Pergamino desvanecido */
```

---

## 🔤 2. TIPOGRAFÍAS (Fuentes Web)

### Fuentes Importadas (Google Fonts)
```html
<!-- Enlace para incluir en <head> -->
<link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Cinzel:wght@400;600;700&family=Almendra:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### Asignación de Fuentes por Elemento

#### **Cinzel** (Serif Elegante - Títulos y Encabezados)
```css
font-family: 'Cinzel', serif;
font-weight: 700;                    /* Bold para títulos */
font-weight: 600;                    /* Semi-bold para subtítulos */
```
**Uso:**
- Headers principales
- Títulos de secciones
- Navegación de mes/año
- Títulos de modales
- Números grandes (contadores)
- Encabezados de tarjetas

**Ejemplo de tamaños:**
- Header title: `20px`
- Títulos de sección: `24px`
- Títulos de año: `24px`
- Títulos de mes: `16px`
- Números de contador: `32px`

#### **MedievalSharp** (Cursiva Medieval - Botones y Etiquetas)
```css
font-family: 'MedievalSharp', cursive;
font-weight: 600;                    /* Semi-bold */
```
**Uso:**
- Botones de acción
- Pestañas de navegación
- Etiquetas de formularios
- Notificaciones toast
- Texto de botones

**Ejemplo de tamaños:**
- Botones: `14px`
- Pestañas: `13px`
- Etiquetas: `14px`
- Toast: `14px`

#### **Almendra** (Serif Clásico - Texto de Cuerpo)
```css
font-family: 'Almendra', serif;
font-weight: 400;                    /* Regular */
font-weight: 700;                    /* Bold (opcional) */
font-style: italic;                   /* Para textos secundarios */
```
**Uso:**
- Texto principal del cuerpo
- Contenido de notas
- Textos descriptivos
- Fechas y horas
- Textos de entrada (textarea, input)
- Mensajes

**Ejemplo de tamaños:**
- Texto principal: `16px`
- Texto de notas: `14px`
- Texto secundario: `12px`
- Texto pequeño: `10px`

### Propiedades de Texto Adicionales
```css
/* Espaciado de letras */
letter-spacing: 2px;                 /* Títulos principales */
letter-spacing: 1px;                 /* Títulos secundarios */
letter-spacing: 0.5px;               /* Texto normal */

/* Transformación de texto */
text-transform: uppercase;           /* Títulos, botones, pestañas */

/* Sombra de texto */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);      /* Títulos grandes */
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);      /* Títulos medianos */
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);      /* Textos sutiles */
```

---

## 🎭 3. EFECTOS VISUALES Y TEXTURAS

### Textura de Pergamino (Fondo)
```css
body::before {
    background-image: 
        /* Textura de ruido SVG */
        url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
        /* Gradiente sutil de color */
        linear-gradient(135deg, rgba(139, 38, 53, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
    opacity: 1;
    mix-blend-mode: multiply;
}
```

### Bordes (Estilo Medieval)
```css
/* Borde doble (sello de cera) */
border: 3px double var(--gold-leaf);
border: 4px double var(--gold-leaf);    /* Más grueso */
border: 6px double var(--gold-leaf);     /* Muy grueso (modales) */

/* Borde simple */
border: 2px solid var(--gold-leaf);
border: 3px solid var(--gold-leaf);

/* Bordes de diferentes colores */
border-bottom: 3px double var(--gold-leaf);
border-top: 3px double var(--gold-leaf);
border: 2px solid var(--sepia);
border: 3px solid var(--cinnabar);
```

### Sombras (Box Shadow)
```css
/* Sombra ligera */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

/* Sombra media */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

/* Sombra fuerte (modales) */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

/* Sombra múltiple (profundidad) */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Sombra interna (inset) */
box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);

/* Sombra con resplandor */
box-shadow: 0 0 8px rgba(139, 38, 53, 0.4);      /* Resplandor rojo */
```

### Gradientes de Fondo
```css
/* Header - Rojo real */
background: linear-gradient(135deg, var(--cinnabar) 0%, #6B1F2A 100%);

/* Navegación - Tierra */
background: linear-gradient(135deg, var(--sepia) 0%, var(--ocher) 100%);

/* Navegación de mes - Azul real */
background: linear-gradient(135deg, var(--lapis-lazuli) 0%, #152A5E 100%);

/* Botones principales - Azul */
background: linear-gradient(135deg, var(--lapis-lazuli) 0%, #152A5E 100%);

/* Barra inferior - Tierra */
background: linear-gradient(135deg, var(--sepia) 0%, var(--ocher) 100%);
```

### Bordes Redondeados
```css
border-radius: 4px;      /* Botones pequeños, elementos */
border-radius: 6px;      /* Botones medianos, tarjetas */
border-radius: 8px;      /* Tarjetas grandes, modales */
border-radius: 12px;     /* Modales principales */
border-radius: 2px;      /* Elementos muy pequeños */
```

---

## 🧩 4. COMPONENTES VISUALES ESPECÍFICOS

### Header (Encabezado Principal)
```css
.header {
    background: linear-gradient(135deg, var(--cinnabar) 0%, #6B1F2A 100%);
    color: var(--gold-leaf);
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-bottom: 3px double var(--gold-leaf);
    font-family: 'Cinzel', serif;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.header-title {
    font-size: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
}
```

### Botones de Header
```css
.header-btn {
    background: rgba(212, 175, 55, 0.2);
    border: 2px solid var(--gold-leaf);
    color: var(--gold-leaf);
    padding: 6px 12px;
    border-radius: 4px;
    font-family: 'MedievalSharp', cursive;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}

.header-btn:hover {
    background: rgba(212, 175, 55, 0.4);
    transform: translateY(-1px);
}
```

### Navegación por Pestañas
```css
.tab-nav {
    background: linear-gradient(135deg, var(--sepia) 0%, var(--ocher) 100%);
    border-bottom: 3px double var(--gold-leaf);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.tab-btn {
    color: var(--parchment);
    padding: 12px 8px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'MedievalSharp', cursive;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
}

.tab-btn.active {
    background: rgba(212, 175, 55, 0.2);
    color: var(--gold-leaf);
    box-shadow: inset 0 -3px 0 var(--gold-leaf);
}

.tab-btn:hover {
    background: rgba(212, 175, 55, 0.15);
}
```

### Botones Principales
```css
.btn {
    padding: 12px;
    border: 3px solid;
    border-radius: 6px;
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.3s;
}

.btn-accept {
    background: var(--lapis-lazuli);
    border-color: var(--gold-leaf);
    color: var(--gold-leaf);
}

.btn-cancel {
    background: var(--parchment-dark);
    border-color: var(--sepia);
    color: var(--sepia);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

### Tarjetas (Cards)
```css
.card {
    background: var(--parchment-dark);
    border: 4px double var(--gold-leaf);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.card-small {
    background: var(--parchment-dark);
    border: 3px solid var(--gold-leaf);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
```

### Modales
```css
.modal-content {
    background: var(--parchment);
    border: 6px double var(--gold-leaf);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.modal-header {
    background: linear-gradient(135deg, var(--cinnabar) 0%, #6B1F2A 100%);
    color: var(--gold-leaf);
    padding: 16px;
    border-bottom: 3px double var(--gold-leaf);
    font-family: 'Cinzel', serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
}
```

### Inputs y Textareas
```css
.notes-textarea,
.notes-input,
.notes-select {
    background: var(--parchment-dark);
    border: 3px solid var(--gold-leaf);
    border-radius: 6px;
    padding: 12px;
    font-family: 'Almendra', serif;
    font-size: 16px;
    color: var(--iron-gall);
}

.notes-input,
.notes-select {
    border: 2px solid var(--gold-leaf);
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
}
```

### Notificaciones Toast
```css
.toast {
    background: var(--parchment);
    border: 3px solid var(--gold-leaf);
    color: var(--iron-gall);
    padding: 12px 20px;
    border-radius: 8px;
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Mensajes (Message Box)
```css
.message-box {
    background: var(--parchment);
    border: 4px double var(--gold-leaf);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    font-family: 'Almendra', serif;
    text-align: center;
}

.message-title {
    font-family: 'Cinzel', serif;
    font-size: 18px;
    color: var(--cinnabar);
    font-weight: 700;
}

.message-text {
    font-size: 16px;
    color: var(--iron-gall);
}
```

---

## 🎬 5. ANIMACIONES Y TRANSICIONES

### Transiciones Estándar
```css
transition: all 0.3s;                /* Transición suave general */
transition: opacity 0.3s ease-out;   /* Fade in/out */
transition: transform 0.3s;          /* Transformaciones */
```

### Efectos Hover
```css
/* Elevación */
transform: translateY(-1px);         /* Elevación pequeña */
transform: translateY(-2px);         /* Elevación media */

/* Escala */
transform: scale(1.1);                /* Crecimiento 10% */

/* Cambio de opacidad */
background: rgba(212, 175, 55, 0.4); /* Más opaco al hover */
```

### Animaciones Keyframes
```css
/* Toast - Entrada */
@keyframes toast-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Toast - Salida */
@keyframes toast-out {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
    }
}

/* Aplicación */
animation: toast-in 0.3s ease-out, toast-out 0.3s ease-in 2.7s forwards;
```

---

## 📏 6. ESPACIADO Y TAMAÑOS

### Padding (Relleno Interno)
```css
padding: 6px 12px;       /* Botones pequeños */
padding: 8px 12px;       /* Botones medianos */
padding: 12px;           /* Botones grandes, tarjetas pequeñas */
padding: 12px 16px;      /* Header, navegación */
padding: 16px;           /* Modales, tarjetas medianas */
padding: 20px;           /* Cuerpo de modales, tarjetas grandes */
```

### Margin (Espaciado Externo)
```css
margin-bottom: 4px;      /* Espaciado muy pequeño */
margin-bottom: 8px;      /* Espaciado pequeño */
margin-bottom: 12px;    /* Espaciado medio */
margin-bottom: 16px;    /* Espaciado grande */
gap: 12px;              /* Espaciado entre elementos flex/grid */
gap: 20px;              /* Espaciado grande entre elementos */
```

### Tamaños de Fuente
```css
font-size: 10px;        /* Texto muy pequeño (eventos en calendario) */
font-size: 12px;        /* Texto pequeño (fechas, horas) */
font-size: 13px;        /* Pestañas, etiquetas pequeñas */
font-size: 14px;        /* Texto normal, botones, notas */
font-size: 16px;        /* Texto principal, inputs */
font-size: 18px;        /* Títulos de mensajes */
font-size: 20px;        /* Header, títulos de modales */
font-size: 24px;        /* Títulos grandes de sección */
font-size: 32px;        /* Números grandes (contadores) */
```

### Border Radius (Bordes Redondeados)
```css
border-radius: 2px;      /* Elementos muy pequeños */
border-radius: 4px;     /* Botones pequeños, inputs */
border-radius: 6px;     /* Botones medianos, tarjetas pequeñas */
border-radius: 8px;     /* Tarjetas, modales pequeños */
border-radius: 12px;    /* Modales grandes */
```

---

## 🎯 7. Z-INDEX (Capas)

```css
z-index: 1;             /* Fondo de textura */
z-index: 10;            /* Contenido principal */
z-index: 98;            /* Navegación de mes */
z-index: 99;            /* Navegación de pestañas */
z-index: 100;           /* Header, botones inferiores */
z-index: 1000;           /* Modales */
z-index: 2000;           /* Modales de segundo nivel */
z-index: 9999;           /* Toast notifications */
z-index: 10000;          /* Mensajes importantes */
```

---

## 📱 8. RESPONSIVE (Media Queries)

```css
@media (max-width: 768px) {
    /* Ajustes para móviles */
    .calendar-day {
        min-height: 60px;
        padding: 4px;
    }
    
    .day-number {
        font-size: 12px;
    }
    
    .day-events {
        font-size: 9px;
    }
    
    .summary-cards {
        grid-template-columns: 1fr;
    }
}
```

---

## 🖱️ 9. SCROLLBAR PERSONALIZADO

```css
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    background: var(--parchment-dark);
}

::-webkit-scrollbar-thumb {
    background: var(--gold-leaf);
    border: 2px solid var(--parchment-dark);
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--ocher);
}
```

---

## 📋 10. RESUMEN DE USO POR ELEMENTO

### Títulos Principales
- **Fuente:** Cinzel, 700 (bold)
- **Tamaño:** 20-24px
- **Color:** Cinnabar (#8B2635) o Gold-leaf (#D4AF37)
- **Efectos:** text-shadow, letter-spacing: 2px, uppercase

### Botones
- **Fuente:** MedievalSharp, 600
- **Tamaño:** 14px
- **Borde:** 3px solid gold-leaf
- **Efectos:** hover con translateY(-2px), box-shadow

### Texto de Cuerpo
- **Fuente:** Almendra, 400
- **Tamaño:** 14-16px
- **Color:** Iron-gall (#1A1A1A)

### Fondos
- **Principal:** Parchment (#F4E4BC)
- **Tarjetas:** Parchment-dark (#E8D5A3)
- **Header:** Gradiente cinnabar
- **Navegación:** Gradiente sepia-ocher

### Bordes
- **Estilo:** double (doble línea)
- **Grosor:** 3-6px
- **Color:** Gold-leaf (#D4AF37)

---

## 🚀 11. CÓDIGO CSS COMPLETO PARA COPIAR

```css
/* Variables CSS */
:root {
    --parchment: #F4E4BC;
    --parchment-dark: #E8D5A3;
    --iron-gall: #1A1A1A;
    --gold-leaf: #D4AF37;
    --cinnabar: #8B2635;
    --lapis-lazuli: #1E3A8A;
    --sepia: #704214;
    --ocher: #CC7722;
    --ink-black: #0A0A0A;
}

/* Fuentes */
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&family=Cinzel:wght@400;600;700&family=Almendra:ital,wght@0,400;0,700;1,400&display=swap');

/* Textura de fondo */
body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
        linear-gradient(135deg, rgba(139, 38, 53, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
    pointer-events: none;
    z-index: 1;
}
```

---

## ✅ CHECKLIST PARA REUTILIZAR

- [ ] Copiar variables CSS de colores
- [ ] Incluir enlaces de Google Fonts
- [ ] Aplicar textura de pergamino al fondo
- [ ] Usar Cinzel para títulos
- [ ] Usar MedievalSharp para botones
- [ ] Usar Almendra para texto de cuerpo
- [ ] Aplicar bordes dobles (double) en elementos importantes
- [ ] Usar gradientes en headers y navegación
- [ ] Aplicar sombras con profundidad
- [ ] Implementar efectos hover con transform
- [ ] Personalizar scrollbar
- [ ] Ajustar z-index según necesidad

---

**📜 Fin de la Guía Visual Medieval**

*Todos estos estilos están diseñados para crear una experiencia visual inmersiva con estética medieval auténtica.*

