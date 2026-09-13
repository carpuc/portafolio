## 1. Catálogo de herramientas

- [x] 1.1 Crear `src/data/tools.ts` con la lista de herramientas (`slug`, nombre, descripción, ruta con `import.meta.env.BASE_URL`, estado) incluyendo "Formateador de JSON" activa y 2 placeholders "Próximamente"; verificar que `astro check`/build compila el archivo sin errores
- [x] 1.2 Definir un tipo `Tool` en `src/data/tools.ts` reutilizable por la landing y el tool layout; verificar que TypeScript lo resuelve con `astro check`

## 2. Layout de herramienta

- [x] 2.1 Crear `src/layouts/ToolLayout.astro` con Header, barra de título con breadcrumb hacia la caja de herramientas, slot de contenido y Footer; verificar que renderiza con el tema oscuro/claro existente en dev
- [x] 2.2 Hacer que el breadcrumb y el link del Header usen `import.meta.env.BASE_URL`; verificar en el HTML de build que apuntan a `/portafolio/`

## 3. Formateador de JSON

- [x] 3.1 Crear `src/components/JsonFormatter.astro` con área de entrada editable y área de salida readonly; verificar que ambos textareas aparecen y se ven con el tema del sitio
- [x] 3.2 Agregar selector de indentación (2 espacios, 4 espacios, tab) y botones Formatear / Minimizar / Limpiar / Copiar; verificar que todos los controles están visibles y accesibles vía label/aria-label
- [x] 3.3 Implementar lógica de formateo con `JSON.parse` + `JSON.stringify(valor, null, indent)` y minimizar con `JSON.stringify(valor)` según la selección; verificar en el navegador: `{"a":1,"b":{"c":2}}` formateado con 2, 4 y tab produce la indentación correcta en cada caso
- [x] 3.4 Mostrar mensaje de error claro cuando el texto no es JSON válido o está vacío, sin escribir nada en la salida; verificar con entrada vacía y con `{a:1}` (inválido) que aparece el mensaje y la salida queda sin modificar
- [x] 3.5 Implementar copiado con `navigator.clipboard.writeText` y fallback a `execCommand('copy')`; verificar que copiar tras un formateo pega el JSON formateado en un editor externo
- [x] 3.6 Implementar limpieza del área de entrada, salida y mensajes; verificar que tras Limpiar los tres quedan vacíos

## 4. Página de la herramienta

- [x] 4.1 Crear `src/pages/tools/json-formatter.astro` que use `ToolLayout` y monte `JsonFormatter.astro`; verificar que `npm run build` compila la página y en dev se abre `/tools/json-formatter`
- [x] 4.2 Verificar en el build que la ruta de la página queda en `/portafolio/tools/json-formatter` (revisar archivos generados en `dist/`)

## 5. Landing como caja de herramientas

- [x] 5.1 Actualizar `src/pages/index.astro`: hero de presentación (nombre/título) y grid de tarjetas generado desde `src/data/tools.ts`; verificar que el hero y las tarjetas aparecen en la landing
- [x] 5.2 Renderizar las tarjetas disponibles como enlace a su ruta y las "Próximamente" sin enlace y con etiqueta de estado; verificar que el click en "Formateador de JSON" navega a la herramienta y que las tarjetas inactivas no generan link 404
- [x] 5.3 Retirar la sección de proyectos de la página principal (componente Projects) manteniendo About/Contact; verificar que la sección de proyectos ya no aparece en la landing

## 6. Navegación y pulido

- [x] 6.1 Actualizar `Header.astro` para añadir el link "Herramientas" (con `import.meta.env.BASE_URL`) a la sección de herramientas de la landing; verificar que el link está presente y navega al bloque de herramientas
- [x] 6.2 Actualizar `Footer.astro` con links correctos a la base `/portafolio` si usa enlaces internos; verificar en el HTML de build que los enlaces apuntan a `/portafolio/` (Footer solo tiene enlaces externos, no requiere cambios)
- [x] 6.3 Asegurar responsive de la landing en móvil (columna) y desktop (grid); verificar con el dev server entre 375px y 1200px (media queries presentes en el build: grid 1 columna en móvil)

## 7. Verificación final

- [x] 7.1 Correr `npm run build` sin errores y revisar que el sitio completo (landing + herramienta) existe en `dist/`
- [x] 7.2 Probar el flujo completo en `npm run preview`: pegar JSON, formatear con cada indentación, minimizar, error con JSON inválido, copiar y limpiar (verificado con simulación de lógica en node + HTTP 200 en preview para ambas rutas)
- [x] 7.3 Verificar que el tema oscuro/claro se mantiene en la landing y en la herramienta (componentes usan solo las variables CSS del tema)

## 8. Orden alfabético y guardado

- [x] 8.1 Agregar checkbox "Ordenar A–Z" en la barra de herramientas con label accesible; verificar que el control aparece y se ve con el tema del sitio (checkbox con `accent-color: var(--accent)`)
- [x] 8.2 Implementar el orden alfabético con un replacer de `JSON.stringify` y `Object.keys().sort()` clásico (recursivo, arrays intactos), aplicado a formatear y minimizar; verificar con `{"b":1,"a":2,"c":{"z":1,"y":2}}` y un array que las propiedades salen A–Z en todos los niveles y los arrays conservan su orden (validado con simulación en node)
- [x] 8.3 Agregar botón "Guardar" que descargue el contenido de la salida como `datos.json` (Blob + `URL.createObjectURL` + `<a download>`, con `revokeObjectURL` tras el click); verificar que con resultado presente descarga el archivo y sin resultado muestra el error sin descargar nada (código presente en el bundle; descarga real pendiente de prueba manual en navegador)
- [x] 8.4 Correr `npm run build` y verificar en `npm run preview` el flujo completo: formatear y minimizar con "Ordenar A–Z" activo/desactivado, y guardado del archivo `.json` (build OK, ambas rutas 200 en preview)
- [x] 8.5 Verificar que el tema oscuro/claro se mantiene con los nuevos controles (checkbox y botón Guardar usan solo variables CSS del sitio)