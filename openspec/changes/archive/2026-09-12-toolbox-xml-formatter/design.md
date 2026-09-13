## Context

Ver `proposal.md - Why`. El formateador de JSON ya define la UX a replicar (toolbar, textareas entrada/salida, panel de error, botones) y se apoya en `src/lib/clipboard.ts` y `src/lib/download.ts`.

A diferencia de JSON, el navegador **no** ofrece un pretty-printer de XML: `XMLSerializer` devuelve el documento sin saltos ni indentación. Por eso el formateo debe construirse. El grid de herramientas es `repeat(auto-fit, minmax(280px, 1fr))` y renderiza en el orden del array `tools`, así que el orden visual se controla desde `src/data/tools.ts`.

## Goals / Non-Goals

**Goals:**
- Reproducir la UX del formateador de JSON (indentación, minimizar, copiar, guardar, limpiar) con un motor propio de XML.
- Preservar el significado del XML, en especial el contenido mixto.
- Eliminar la triplicación de estilos de botón/error.

**Non-Goals:**
- No es un validador contra DTD/XSD ni un editor de nodos.
- No se reescribe ni reordena la estructura de elementos (el orden es semántico).
- No se añaden dependencias externas.

## Decisions

### Motor de formato: tokenizer propio (no DOM-walk)
Recorrer el string reconociendo tags de apertura/cierre, self-closing, declaración `<?…?>`, comentarios, CDATA, doctype y texto; llevar la profundidad y emitir saltos + indentación. La minimización es el mismo recorrido sin saltos ni espacios entre tags.

- **Por qué**: sin dependencias, ~70–100 líneas, y control explícito del contenido mixto.
- **Alternativa descartada**: `DOMParser` + recorrido del DOM. `XMLSerializer` no embellece, y al re-serializar el DOM se normalizan entidades/espacios (p. ej. `&nbsp;`, comillas de atributos), alterando el original. El tokenizer conserva el texto tal cual.

### Contenido mixto: inline, sin indentar dentro
Si un elemento contiene nodos de texto con contenido (no solo espacios), se emite en una sola línea sin insertar espacios entre sus hijos.

- **Por qué**: añadir indentación dentro de texto cambia el valor del nodo (`<p>Hola <b>mundo</b></p>` → saltos y espacios extra). Omitirlo violaría el requirement de contenido mixto.

### Validación con `DOMParser`
Parsear con `DOMParser().parseFromString(texto, 'application/xml')` y detectar el nodo `parsererror` para reportar XML inválido, con un mensaje claro.

- **Por qué**: nativo, sin dependencias, y cubre XML bien formado. No valida semántica (fuera de alcance).

### Extracción de estilos compartidos
Mover `.btn`, `.btn-primary` y el panel de error a `BaseLayout` (global) y eliminar las copias locales en `JsonFormatter.astro` y `PasswordGenerator.astro`; `XmlFormatter.astro` los usa desde el inicio.

- **Por qué**: XML sería la tercera copia; es el momento de DRY. El cambio es CSS y de nombres de clase, sin alterar comportamiento.
- **Nota**: el panel de error se unifica en una clase común (p. ej. `.tool-error`) ya usada por las tres herramientas.

### Orden del catálogo
`[json-formatter, xml-formatter, password-generator, generador-uuid]`, eliminando `minificador-css`. El grid coloca JSON y XML juntos y la contraseña a su derecha.

## Risks / Trade-offs

- **Tokenizer con XML exótico** (comentarios/CDATA/doctype anidados o mal formados) → parseo previo con `DOMParser`: si el documento no es bien formado, se reporta error antes de formatear; los casos bien formados se cubren con tests de simulación.
- **Contenido mixto mal detectado** (texto significativo que parece solo espacios) → se considera texto con contenido cualquier nodo que no sea únicamente espacios, y en ese caso se preserva inline.
- **Refactor de estilos rompe las herramientas existentes** → mover CSS sin cambiar clases de acción ni lógica; verificación con build + rutas 200 de las tres herramientas.
- **`minificador-css` deja de mostrarse** → era "Próximamente" y sin ruta; no hay enlaces rotos.
