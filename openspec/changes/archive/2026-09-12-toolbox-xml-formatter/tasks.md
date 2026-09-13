## 1. Estilos compartidos

- [x] 1.1 Extraer `.btn`, `.btn-primary` y el panel de error a `src/layouts/BaseLayout.astro` como estilos globales, y verificar que `npm run build` sigue compilando sin errores
- [x] 1.2 Refactorizar `src/components/JsonFormatter.astro` y `src/components/PasswordGenerator.astro` para eliminar sus copias locales y usar la clase de error común, verificando build y rutas 200 de ambas herramientas

## 2. Motor de formato XML

- [x] 2.1 Implementar en `src/components/XmlFormatter.astro` el tokenizer (tags, cierre, self-closing, declaración, comentario, CDATA, doctype, texto) y el formateo con indentación 2/4/tab, verificando con una simulación en node los casos de anidación simple y profunda
- [x] 2.2 Manejar el contenido mixto dejando inline los elementos con texto y verificar con `<p>Hola <b>mundo</b></p>` que no se insertan espacios ni saltos dentro del texto
- [x] 2.3 Implementar la minimización (sin espacios entre tags, conservando texto) y verificar que un XML formateado se compacta a una sola línea reversible

## 3. Validación y acciones

- [x] 3.1 Implementar la validación con `DOMParser` + detección de `parsererror` y los mensajes de error para XML inválido y entrada vacía, verificando ambos casos
- [x] 3.2 Implementar Copiar (`copyText`), Guardar como `datos.xml` (`downloadBlob`) y Limpiar, verificando el guardado sin resultado y el copiado sin resultado
- [x] 3.3 Maquetar la UI completa (toolbar, botones, textareas entrada/salida readonly, panel de error) y verificar la interacción básica en el navegador

## 4. Página y catálogo

- [x] 4.1 Crear `src/pages/tools/xml-formatter.astro` usando `ToolLayout` con título y descripción, y verificar que la ruta responde 200
- [x] 4.2 Actualizar `src/data/tools.ts`: eliminar `minificador-css`, insertar `xml-formatter` (available, icono `<>`) tras `json-formatter` y verificar el orden JSON, XML, Contraseñas, UUID en la página principal

## 5. Verificación final

- [x] 5.1 Ejecutar `npm run build` y `openspec validate toolbox-xml-formatter`, y verificar las 4 rutas 200 (`/`, `/tools/json-formatter/`, `/tools/xml-formatter/`, `/tools/password-generator/`) y que el catálogo muestra el nuevo orden
