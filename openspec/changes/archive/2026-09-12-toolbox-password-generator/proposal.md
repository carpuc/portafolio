## Why

La caja de herramientas solo tiene una herramienta disponible. Un generador de contraseñas es una utilidad clásica y de alta demanda en un toolbox de programador, se resuelve íntegramente en el cliente y sigue el mismo patrón que el formateador de JSON ya implementado.

## What Changes

- Nueva herramienta "Generador de contraseñas" en su propia ruta (`tools/password-generator/`), con:
  - Longitud configurable de 4 a 64 (slider con número visible y atajos 8/12/16/20).
  - Pools activables: mayúsculas (A–Z), minúsculas (a–z), números (0–9) y símbolos (`!@#$%^&*()-_=+[]{}`).
  - Checkbox opcional "Símbolos finos (; : , . ?)" que amplía el pool de símbolos al set completo cuando se marca; desmarcado por defecto. No es un pool obligatorio: conserva el invariante de longitud mínima 4 (máx. 4 pools garantizados).
  - Excluir caracteres: campo libre que filtra del pool los caracteres escritos.
  - Garantía de presencia: el resultado incluye al menos un carácter de cada pool activo (enfoque A).
  - Generación criptográfica con `crypto.getRandomValues` y algoritmo de rechazo.
  - Regeneración automática al cambiar cualquier opción y botón "Actualizar".
  - Campo de salida único de solo lectura con botones "Copiar" y "Guardar".
  - Guardado como archivo `password.txt` (texto plano).
  - Medidor de fortaleza (débil/media/fuerte) según diversidad de pools y longitud.
- Refactor interno: extraer helpers reutilizables de copiar (`src/lib/clipboard.ts`) y descarga (`src/lib/download.ts`) usados por el generador y por el formateador de JSON existente. Refactor puro, sin cambios de comportamiento.
- Catálogo de herramientas actualizado: `password-generator` pasa a `available`.

## Capabilities

### New Capabilities
- `tools/password-generator`: Comportamiento del generador de contraseñas — longitud, pools de caracteres, exclusión, garantía de presencia, regeneración, copiado, guardado en `.txt` y medidor de fortaleza.

### Modified Capabilities
- (implementation-only refactor of `tools/json-formatter`; no requirement changes)

## Impact

- Archivos nuevos: `src/components/PasswordGenerator.astro`, `src/pages/tools/password-generator.astro`, `src/lib/clipboard.ts`, `src/lib/download.ts`.
- Modificados: `src/data/tools.ts` (nueva entrada disponible), `src/components/JsonFormatter.astro` (usar helpers compartidos en Copiar/Guardar).
- Sin dependencias nuevas; 100% del lado del cliente. Nombre del archivo descargado: `password.txt`.