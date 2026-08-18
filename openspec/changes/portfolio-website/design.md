## Context

Proyecto nuevo sin código existente. Se creará desde cero un sitio web estático con Astro para GitHub Pages. El usuario tiene un repo en GitHub que será el origen del sitio.

## Goals / Non-Goals

**Goals:**
- Tener un portafolio funcional online en menos de 1 hora de trabajo
- Deploy automático con cada push
- Diseño profesional y moderno
- Fácil de mantener y expandir cuando haya proyectos

**Non-Goals:**
- Blog (se puede agregar después)
- CMS headless
- Autenticación o bases de datos
- Multi-idioma
- Analytics (se puede agregar después)

## Decisions

### Framework: Astro
**Decisión**: Usar Astro como framework estático.

**Alternativas consideradas:**
| Opción | Pros | Contras |
|--------|------|---------|
| **Astro** ✅ | Rápido, simple, build estático, themes bonitos | Curva de aprendizaje menor |
| Next.js | Popular, SSR | Overkill para sitio estático |
| HTML/CSS puro | Control total, sin dependencias | Más trabajo manual, difícil de mantener |
| Hugo | Ultra rápido | Menos flexible, Go templates |

**Por qué Astro**: Balance perfecto para un portafolio — rápido de empezar, fácil de mantener, resultado profesional.

### Theme: Astro "Portfolio" template
**Decisión**: Usar el template oficial de Astro como base.

**Alternativas:**
- Crear desde cero → Más trabajo, más riesgo de diseño
- Usar template de terceros → Depende de mantenimiento externo
- Template oficial → Mantenido por el equipo de Astro, bien documentado

### Deploy: GitHub Actions + GitHub Pages
**Decisión**: Deploy automático via GitHub Actions.

**Alternativas:**
- Netlify/Vercel → Configuración adicional, posibles costos
- GitHub Pages nativo → Más simple pero menos control
- GitHub Actions → Control total, gratis para repos públicos

### Hosting: GitHub Pages
**Decisión**: GitHub Pages porque el repo ya existe en GitHub.

**Razón**: Sin configuración adicional, gratis para repos públicos, integración nativa con GitHub.

## Risks / Trade-offs

- **[Riesgo] Dependencia de GitHub** → Mitigación: El código es portable, se puede mover a otro hosting
- **[Trade-off] Menos features que Next.js** → Aceptado: Para un portafolio estático, Astro tiene todo lo necesario
- **[Riesgo] Tiempo de build** → Mitigación: Astro es rápido, builds < 30 segundos

## Migration Plan

1. Crear repo en GitHub (si no existe)
2. Inicializar proyecto Astro
3. Configurar GitHub Actions para deploy
4. Push a main → Deploy automático
5. Verificar sitio en https://litospuc.github.io

## Open Questions

- ¿Ya tienes el repo creado en GitHub? (necesario para el deploy)
- ¿Qué username de GitHub usas? (para la URL del sitio)
