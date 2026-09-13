## Context

Sitio Astro estático (`output: 'static'`) desplegado en GitHub Pages con `base: '/portafolio'`. Hoy es una landing page de una sola página (`src/pages/index.astro`) con secciones About, Skills, Projects y Contact, Header y Footer propios, y tema oscuro/claro por CSS variables. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Convertir la landing en una caja de herramientas manteniendo el sistema de diseño (variables CSS, tema, Header/Footer).
- Primera herramienta: formateador de JSON funcional en una ruta propia, 100% del lado del cliente.
- Formateador con orden alfabético de propiedades y descarga del resultado como `.json`.
- Enfrentar correctamente el `base: /portafolio` para que todos los enlaces funcionen en GitHub Pages.

**Non-Goals:**
- Otras herramientas (solo se deja la estructura del grid para agregarlas después).
- Upload de archivos, historial, persistencia, atajos de teclado avanzados ni sintaxis resaltada.
- Backend, API o autenticación.

## Decisions

### Enrutado: páginas Astro por archivo
**Decisión**: Usar el routing de Astro por archivos: `src/pages/index.astro` (caja de herramientas) y `src/pages/tools/json-formatter.astro` (formateador).

**Alternativas consideradas:**
| Opción | Pros | Contras |
|--------|------|---------|
| **Páginas Astro por archivo** ✅ | Routing nativo, estático, SEO | Dos páginas a mantener |
| Todo en un SPA con estado | Una sola página | Más JS, menos clásico para el sitio |
| Hash en la landing (`/#/tool`) | Sin rutas extra | Feo en URLs, conflicta con anchors |

### Base del sitio: `import.meta.env.BASE_URL`
**Decisión**: Todos los links internos del sitio (Header, grid, tool pages) usan `import.meta.env.BASE_URL` en lugar de rutas absolutas, para que funcionen con y sin la base `/portafolio`.

**Razón**: Astro expone la base configurada vía la variable; usarla evita los links rotos del deploy en subdirectorio.

### Estructura de la herramienta
**Decisión**: Componente `src/components/JsonFormatter.astro` con lógica en un `<script>` inline, montado en `src/pages/tools/json-formatter.astro` envuelto en un `ToolLayout` reutilizable (`layout` con Header/Footer + título).

**Razón**: Cero dependencias nuevas, sigue el patrón `inline script` ya usado en `Header.astro`, y `ToolLayout` se reutiliza para las próximas herramientas.

### Algoritmo del formateador
**Decisión**: Validar con `JSON.parse(entrada)` y emitir con `JSON.stringify(valor, null, indent)`, donde `indent` es `2`, `4` o `'\t'` según la selección. Minimizar = `JSON.stringify(valor)`.

**Razón**: Comportamiento nativo y consistente con los estándares (2/4/tab), sin librería. Es un JSON puro: `undefined`/`NaN`/funciones prohibidas, así que `JSON.parse` deja los datos sin pérdida de tipos soportados.

### Errores y UX
**Decisión**: Bloquear `JsonFormatter.astro` con: área de entrada editable, área de salida readonly, selector de indentación (2/4/tab), botones Formatear / Minimizar / Limpiar / Copiar / Guardar, checkbox "Ordenar A–Z" y un panel de error. Copiar usa `navigator.clipboard.writeText` con fallback a selección de texto.

**Razón**: Cubre los escenarios de la spec con controles mínimos y sin dependencias.

### Orden alfabético de propiedades
**Decisión**: Checkbox "Ordenar A–Z". Al estar activo, formatear y minimizar pasan un replacer a `JSON.stringify` que reconstruye cada objeto con sus claves ordenadas: `Object.keys(obj).sort().reduce(...)` (orden clásico por punto de código, profundo y recursivo), devolviendo los arrays sin cambios.

**Alternativas consideradas:**
| Opción | Pros | Contras |
|--------|------|---------|
| **Replacer de `JSON.stringify`** ✅ | Sin dependencias, orden profundo nativo | Nueva object por nivel (irrelevante aquí) |
| `localeCompare` | Orden "natural" (`a` < `A`) | Más lento, resultado menos común |
| Librería de ordenamiento | Genérico | Dependencia innecesaria |

**Por qué el clásico `sort()`**: es el comportamiento estándar esperado y así lo pidió el usuario.

### Guardado como archivo JSON
**Decisión**: Botón "Guardar" que descarga el contenido actual de la salida como `datos.json` usando `Blob` con tipo `application/json`, `URL.createObjectURL`, un `<a download>` programático y `URL.revokeObjectURL` tras el click. Sin resultado en pantalla: no descarga y muestra el panel de error.

**Razón**: Descarga 100% del lado del cliente, sin servidor ni librerías. El nombre de archivo fijo `datos.json` es una decisión registrada (no hay campo de nombre).

## Risks / Trade-offs

- **[Riesgo] Links rotos por la base `/portafolio`** → Mitigación: usar `import.meta.env.BASE_URL` en todos los enlaces y verificar el deploy en subdirectorio real.
- **[Riesgo] `navigator.clipboard` no disponible en HTTP** → Mitigación: fallback con `document.execCommand('copy')` sobre un área temporal.
- **[Trade-off] JSON inválido se rechaza en bloque** → Aceptado: es lo esperado de un formateador de JSON; el mensaje indica la causa.
- **[Riesgo] Grid con links "próximamente"** → Mitigación: las tarjetas sin herramienta se renderizan sin `<a>`, con etiqueta de estado, para no generar enlaces 404.

## Migration Plan

1. Crear `src/data/tools.ts` con la lista de herramientas (id, nombre, descripción, ruta, estado).
2. Actualizar `index.astro` para renderizar hero + grid desde `tools.ts`; reemplazar la vitrina de proyectos.
3. Actualizar `Header.astro` (nav "Herramientas") y `Footer.astro` con links base-correctos.
4. Crear `ToolLayout.astro` y `src/pages/tools/json-formatter.astro` con `JsonFormatter.astro`.
5. Agregar checkbox "Ordenar A–Z" y botón "Guardar" con su lógica (replacer de sort y descarga Blob).
6. Build local con `npm run build`, revisar en `dist/` que las rutas usen `/portafolio/tools/json-formatter`. Rollback: git revert del commit. No hay migración de datos.

## Open Questions

Sin preguntas abiertas: las decisiones pendientes (ruta de la herramienta, controles, indentaciones) ya están resueltas en este diseño y las specs.