## Why

Los usuarios pegan con frecuencia JSON que llegó con diagonales de escape (`\"` en vez de `"`, `\/`, `\\`) por estar encapsulado dentro de otro string — típico de APIs de gobierno que devuelven un JSON stringify-ado. El formateador de JSON actual rechaza ese texto como inválido, obligando a limpiarlo a mano.

## What Changes

- Nueva herramienta **"Limpiador de JSON"** que quita las diagonales de escape de un JSON encapsulado y lo deja como JSON válido listo para usar.
- La limpieza se hace por capas: decodifica `\"` → `"`, `\/` → `/`, `\\` → `\`, preservando escapes legítimos como `\u00c9` (acentos) o `\n`.
- El resultado limpio se formatea con indentación seleccionable (2 espacios, 4 espacios o tab).
- La herramienta valida el resultado y muestra un mensaje de error claro cuando el texto no puede limpiarse.
- Nuevo componente `JsonCleaner`, nueva página y nueva tarjeta en la cuadrícula, adyacente al Formateador de JSON.
- Copiar al portapapeles, guardar como `.json` y limpiar la herramienta, igual que el formateador existente.

## Capabilities

### New Capabilities
- `tools/json-cleaner`: limpieza de diagonales de escape en JSON encapsulado, con formateo del resultado.

### Modified Capabilities
<!-- Ninguna. El cambio introduce una herramienta nueva; no altera el comportamiento del formateador existente ni de otras herramientas. -->

## Impact

- `src/components/JsonCleaner.astro`: nuevo componente con la UI de la herramienta (entrada/salida, indentación, acciones).
- `src/pages/tools/json-cleaner.astro`: nueva página de la herramienta.
- `src/data/tools.ts`: nueva tarjeta "Limpiador de JSON".
- `src/lib/unescapeJson.ts`: función pura reutilizable que quita las capas de escape y valida por capas.
- `src/lib/clipboard.ts` y `src/lib/download.ts`: reutilizados para copiar y guardar.
- No hay nuevas dependencias.