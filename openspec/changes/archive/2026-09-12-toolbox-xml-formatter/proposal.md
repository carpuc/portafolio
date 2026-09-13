## Why

La caja de herramientas solo cubre JSON. XML es igual de común (configs, feeds, APIs SOAP, pom.xml, SVG) y el usuario ya tiene una UX de formateo probada. Conviene añadir un formateador de XML reutilizando esa misma experiencia, retirar la tarjeta "Minificador de CSS" de la vitrina y reordenar las tarjetas para agrupar los formateadores.

## What Changes

- **Nueva herramienta**: formateador de XML 100% cliente, con la misma carcasa que el formateador de JSON:
  - Formatear con indentación de 2 espacios, 4 espacios o tab.
  - Minimizar a una sola línea (sin espacios entre tags, conservando texto).
  - Validación de XML inválido con mensaje de error claro.
  - Copiar resultado, guardar como `datos.xml` y limpiar entrada/salida/error.
  - Soporte de contenido mixto sin alterar su significado.
- **Catálogo de herramientas** (`src/data/tools.ts`): eliminar la tarjeta `minificador-css`; insertar `xml-formatter` justo después de `json-formatter`; el generador de contraseñas queda a la derecha de XML.
- **Refactor de implementación** (sin cambio de comportamiento): extraer los estilos compartidos `.btn`, `.btn-primary` y el panel de error a `BaseLayout`, y ajustar `JsonFormatter.astro` y `PasswordGenerator.astro` para usarlos, evitando una tercera copia.

## Capabilities

### New Capabilities
- `tools/xml-formatter`: formateo y minimización de XML del lado del cliente con indentación configurable, validación, copiado, guardado y limpieza.

### Modified Capabilities
<!-- Ninguna. El spec `toolbox` describe el grid de forma genérica: añadir/retirar
     tarjetas no cambia su contrato, y el refactor de estilos no altera comportamiento. -->

## Impact

- **Nuevos**: `src/components/XmlFormatter.astro`, `src/pages/tools/xml-formatter.astro`, delta spec `specs/tools/xml-formatter/spec.md`.
- **Modificados**: `src/data/tools.ts` (orden y tarjetas), `src/layouts/BaseLayout.astro` (estilos compartidos), `src/components/JsonFormatter.astro` y `src/components/PasswordGenerator.astro` (usan estilos globales).
- **Sin dependencias nuevas**: motor de formato propio basado en tokens; reutiliza `src/lib/clipboard.ts` y `src/lib/download.ts`.
- El modo `output: 'static'` y el `base: '/portafolio'` se mantienen; se suma una ruta estática más.
