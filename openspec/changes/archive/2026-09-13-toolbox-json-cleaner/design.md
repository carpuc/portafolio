## Context

El sitio es una caja de herramientas Astro estático (sin backend), con un grid de tarjetas definido en `src/data/tools.ts` y componentes por herramienta bajo `src/components/`. El Formateador de JSON (`src/components/JsonFormatter.astro`) ya ofrece entrada/salida, indentación 2/4/tab, copiar y guardar — ese mismo patrón de UI se reutiliza. Ve proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Quitar las diagonales de escape de un JSON encapsulado (una o más capas) sin corromper escapes legítimos (`\u00c9`, `\n`, `\\`).
- Ofrecer el resultado siempre como JSON válido y formateado con indentación 2/4/tab.
- Mantener la lógica de limpieza como función pura, testeable en node sin navegador.

**Non-Goals:**
- No editar el comportamiento del Formateador de JSON existente.
- No añadir ordenamiento A–Z ni minimizado (eso es del formateador).
- No detectar automáticamente el escape en otras herramientas.

## Decisions

### 1. Decodificación por capas con "wrap-and-parse" en lugar de `replace` global
El problema es un JSON cuyo cuerpo fue stringify-ado una o más veces (diagonales de escape). Se decodifica una capa tratando el texto como el cuerpo de una cadena JSON: `JSON.parse('"' + texto + '"')`. Si el resultado es una cadena que a su vez parsea como JSON, esa es la salida; si no, se repite hasta agotar las capas.

Alternativas descartadas:
- **`replace(/\\"/g, '"')` global**: barato pero inseguro — corrompe secuencias como `\\"` o `\\n` y produce JSON inválido silenciosamente.
- **Parser manual**: innecesario; `JSON.parse` ya valida cada capa.

Ventaja del wrap-and-parse: **solo emite resultado cuando cada capa es JSON válido**, y decodifica `\u`/`\n` correctamente porque usa el propio decodificador de JSON.

### 2. Función pura en `src/lib/unescapeJson.ts`
`unescapeJson(texto): string` devuelve el JSON limpio o lanza `Error` con mensaje claro. El componente solo la invoca, captura el error y lo muestra. Así el algoritmo es verificable con un script node (`/tmp/opencode/unescape-sim.js`) igual que el formatter XML.

### 3. Límite de capas
Se decodifican hasta 5 capas para evitar bucles en entradas degeneradas; más de 5 capas de escape no tiene caso práctico y se reporta como "no limpiable".

### 4. UI clonada del formateador
`JsonCleaner.astro` copia el layout de `JsonFormatter.astro` (toolbar con indentación + acciones, editor de entrada y salida readonly), reutilizando `src/lib/clipboard.ts` y `src/lib/download.ts`. Botones: **Limpiar diagonales** (acción principal), Copiar, Guardar, Limpiar.

## Risks / Trade-offs

- [Entrada no limpiable que igualmente "wrap-parsea" y no re-parsea] → La función corta el bucle y lanza error claro; nunca emite JSON que no haya pasado por `JSON.parse`.
- [DoS por capas infinitas] → Tope de 5 capas.
- [Indentación duplicada con el formateador] → Aceptable: la herramienta es una unidad autocontenida; la constante de indentación se repite por separación de responsabilidades.
- [El resultado decodifica `\uXXXX` a acentos literales] → Es el comportamiento deseado (MÉRIDA, ACTUALIZACIÓN quedan legibles) y sigue siendo JSON válido.

## Migration Plan

- Cambio contenido en la rama actual; al aplicar se añade la tarjeta, la página y el componente.
- Rollback: quitar la entrada de `tools.ts` y borrar el componente/página. No toca el formateador existente.

## Open Questions

- No hay preguntas abiertas: el alcance está delimitado por el spec `tools/json-cleaner`.