# Implementación: Generador de contraseñas

## 1. Helpers compartidos

- [x] 1.1 Crear `src/lib/clipboard.ts` exportando `copyText(texto): Promise<void>` con `navigator.clipboard.writeText` y fallback a textarea temporal + `document.execCommand('copy')`; verificar que el módulo compila y expone los tipos correctos
- [x] 1.2 Crear `src/lib/download.ts` exportando `downloadBlob(blob, nombre)` (createObjectURL + `<a download>` + revoke); verificar que permite descargar cualquier Blob con el nombre indicado

## 2. Refactor del formateador de JSON

- [x] 2.1 Reemplazar en `JsonFormatter.astro` el bloque de copiado por `copyText(output.value)` (manteniendo el feedback "Copiado" y el mensaje sin resultado) y el de guardado por `downloadBlob` con `datos.json` de tipo `application/json`; verificar que tras el cambio el build compila y el formateador sigue copiando/guardando igual por simulación en node (mismo comportamiento de siempre)

## 3. Componente del generador

- [x] 3.1 Definir los pools (mayúsculas A–Z, minúsculas a–z, números 0–9, símbolos `!@#$%^&*()-_=+[]{};:,.?`) y un muestreo uniforme con `crypto.getRandomValues` + algoritmo de rechazo (`floor(256/poolSize)*poolSize`); verificar por simulación en node que la distribución no privilegia caracteres y que `crypto` se usa
- [x] 3.2 Implementar `generar()` con garantía de presencia: 1 carácter por pool activo, relleno del resto con el pool unido (menos excluidos) y barajado Fisher–Yates criptográfico; verificar por simulación en node que con los 4 pools y longitud 4 el resultado tiene al menos una mayúscula, minúscula, número y símbolo y longitud exacta (incluye todos los casos de longitud 4..64)
- [x] 3.3 Manejar errores: sin pools activos o pool vacío por exclusión → mensaje visible con `role="alert"` y sin contraseña; verificar que no se genera nada en esos estados
- [x] 3.4 Construir la UI `PasswordGenerator.astro` (patrón del formateador): slider 4–64 con valor numérico, atajos 8/12/16/20, 4 checkboxes, campo "Excluir caracteres", salida única readonly, botones Actualizar / Copiar / Guardar y medidor de fortaleza; verificar que los controles generan el HTML esperado y respetan variables del tema
- [x] 3.5 Conectar la lógica: generar al cargar (todos los pools por defecto), regenerar al cambiar cualquier opción y con Actualizar, copiar con `copyText`, guardar como `password.txt` (`text/plain`) con `downloadBlob` y sin contraseña → error sin descargar; verificar comportamiento completo por simulación en node (incluye que guardar sin password no dispara descarga)
- [x] 3.6 Medidor de fortaleza por diversidad + longitud (fuerte: 4 pools y ≥20; media: ≥2 pools y ≥8; débil en el resto; nulo sin contraseña); verificar los 3 umbrales con casos representativos

## 4. Página y catálogo

- [x] 4.1 Crear `src/pages/tools/password-generator.astro` con `ToolLayout` y el componente; verificar que la ruta compila y monta `password-generator`
- [x] 4.2 Agregar en `src/data/tools.ts` la entrada `password-generator` (`status: 'available'`, ruta `${base}tools/password-generator/`) y un icono `#` o `⚿`; verificar que aparece en el grid de la landing sin romper las demás tarjetas

## 5. Verificación

- [x] 5.1 Correr `npm run build` y `npm run preview`; verificar en `dist/preview` que `/portafolio/tools/password-generator/` responde 200 y que el formateador siguió funcionando tras el refactor (200)
- [x] 5.2 Validar el cambio con `openspec validate toolbox-password-generator`

## 6. Ajuste del set de símbolos (sin "finos")

- [x] 6.1 Actualizar la spec (texto del set en "Selección de pools") y el design.md (decisión documentada) para el nuevo set de símbolos por defecto `!@#$%^&*()-_=+[]{}` (se eliminan `; : , . ?`)
- [x] 6.2 Corregir el bug de raíz que generaba "muchas comas": `filtered` era un array de arrays y `filtered.join('')` serializaba cada sub-array con `Array#toString()`, inyectando una coma entre cada carácter (~50% del pool). Fix: construir cada pool filtrado como **string** (`[...pool].filter(...).join('')`) manteniendo `SYMBOLS` en el nuevo set; verificar por simulación en node que ninguna contraseña contiene `;`, `:`, `,`, `.`, `?` y que la garantía de presencia, la uniformidad (`chars=80`) y la exclusión siguen intactas
- [x] 6.3 Correr `npm run build` y verificar 200 en las 3 rutas (`/`, `/tools/json-formatter/`, `/tools/password-generator/`) y `openspec validate toolbox-password-generator`

## 7. Símbolos finos opcionales

- [x] 7.1 Actualizar proposal.md, spec y design.md con la opción de símbolos finos (checkbox que amplía el pool de símbolos; NO pool obligatorio para no romper el invariante de longitud mínima 4); `openspec validate toolbox-password-generator`
- [x] 7.2 Implementar en `PasswordGenerator.astro` un checkbox "Símbolos finos (;:,.?)" desmarcado por defecto que, al marcarse, amplíe `SYMBOLS` a `!@#$%^&*()-_=+[]{};:,.?`; verificar por simulación en node que desmarcado nunca genera `;`, `:`, `,`, `.`, `?`, que marcado puede incluirlos sin exigir presencia y que garantía (longitud 4 con 4 pools), uniformidad y exclusión siguen intactas
- [x] 7.3 Correr `npm run build` y verificar 200 en las 3 rutas y `openspec validate toolbox-password-generator`