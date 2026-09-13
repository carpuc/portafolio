## Why

Un portafolio tradicional muestra proyectos, pero la mejor carta de presentación de un desarrollador es que su propia página sea una herramienta útil. Quiero convertir la página en una "caja de herramientas" de programador: la presentación del sitio es un conjunto de herramientas reales que resuelven problemas de desarrollo. Empiezo con la primera y más demandada: un formateador de JSON.

## What Changes

- Transformar la página principal (`/`) de secciones de portafolio a una **caja de herramientas**: hero de presentación + grid de tarjetas de herramientas, con la sección de proyectos reemplazada por las herramientas como vitrina principal.
- Agregar la herramienta **Formateador de JSON** en una ruta propia (`/tools/json-formatter`) con:
  - Formatear JSON con indentación seleccionable: 2 espacios, 4 espacios o tab.
  - Minimizar JSON (una línea).
  - Validación con mensaje de error claro cuando el JSON es inválido.
  - Botón para copiar el resultado al portapapeles y borrar para limpiar ambos campos.
  - Ordenar alfabéticamente las propiedades del JSON (A–Z, orden clásico) al formatear o minimizar.
  - Guardar el resultado como archivo `.json` descargable desde el navegador.
  - Funcionamiento 100% en el cliente, sin servidor.
- Mantener layout, tema oscuro/claro, Header, Footer y estilos existentes del sitio.
- Navegación actualizada para incluir "Herramientas" y el link a la herramienta.

## Capabilities

### New Capabilities

- `toolbox`: La página principal presentada como caja de herramientas — hero, grid de tarjetas de herramientas y navegación hacia cada herramienta.
- `tools/json-formatter`: Comportamiento del formateador de JSON — entrada/salida, formateo con indentación configurable, minimizar, orden alfabético, guardado en archivo, errores y copiado.

### Modified Capabilities

_No aplica — aún no hay specs archivados en `openspec/specs/`; todas las capacidades son nuevas._

## Impact

- **Código nuevo**: `src/pages/tools/json-formatter.astro`, componente `JsonFormatter.astro`, layout de herramienta, grid de herramientas en `index.astro`.
- **Código modificado**: `src/pages/index.astro`, `src/components/Header.astro` (nav), posiblemente `Footer.astro`.
- **Dependencias**: ninguna nueva (usa `JSON.parse`/`JSON.stringify` nativos y `navigator.clipboard`).
- **Infraestructura**: sin cambios — sigue siendo estático en GitHub Pages con base `/portafolio`.