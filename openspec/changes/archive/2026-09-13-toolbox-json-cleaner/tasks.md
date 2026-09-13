## 1. Función de limpieza

- [x] 1.1 Crear `src/lib/unescapeJson.ts` con la función pura `unescapeJson(texto)` que decodifique hasta 5 capas de escape (wrap-and-parse) y lance `Error` descriptivo si el texto no es limpiable; verificar con un script node en `/tmp/opencode/unescape-sim.js` que: JSON ya válido pasa intacto, `\"clave\"` → `"clave"`, `\u00c9` → É, `\\/` → `/`, una doble capa se decodifica dos veces, y un texto no limpiable lanza error

## 2. Componente de la herramienta

- [x] 2.1 Crear `src/components/JsonCleaner.astro` clonando el layout y estilos de `JsonFormatter.astro`: toolbar con selector de indentación (2/4/tab), botón principal "Limpiar diagonales" y botones Copiar, Guardar y Limpiar, más editor de entrada y editor de salida readonly
- [x] 2.2 Integrar `unescapeJson` en el componente: al presionar cuerpo principal, limpiar y serializar con la indentación elegida (`JSON.stringify(data, null, indent)`), y mostrar en `.tool-error` los mensajes de error (entrada vacía, texto no limpiable) reutilizando la clase global `.tool-error` de `BaseLayout`
- [x] 2.3 Conectar Copiar (reutilizando `src/lib/clipboard.ts`), Guardar como `datos.json` (reutilizando `src/lib/download.ts`) y Limpiar; verificar que los errores de "no hay resultado" se muestran en `.tool-error` como el formateador actual

## 3. Página y tarjeta en el toolbox

- [x] 3.1 Crear `src/pages/tools/json-cleaner.astro` con `<ToolLayout title="Limpiador de JSON | Carlos Puc" toolName="Limpiador de JSON">` renderizando `<JsonCleaner />`
- [x] 3.2 Añadir a `src/data/tools.ts` la tarjeta del Limpiador de JSON **adyacente al Formateador de JSON** (slug `json-cleaner`, icono `\\"`, descripción que mencione quitar diagonales de escape), conservando el resto del grid; verificar que la card enlaza a `${base}tools/json-cleaner/`

## 4. Verificación

- [x] 4.1 Correr `npm run build` y verificar que las 4 rutas de herramientas responden HTTP 200 (json, cleaner, xml, passwords) y que el grid muestra 4 tarjetas
- [x] 4.2 Correr `openspec validate --specs` y confirmar que el spec queda 7/7 sin errores