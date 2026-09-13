## Context

Sitio Astro estático (`output: 'static'`) desplegado en GitHub Pages con `base: '/portafolio'`. La caja de herramientas ya tiene el formateador de JSON disponible (`src/components/JsonFormatter.astro`), el catálogo `src/data/tools.ts`, el `ToolLayout` reutilizable y un tema oscuro/claro con variables CSS. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Nueva herramienta "Generador de contraseñas" disponible en `tools/password-generator/`, 100% del lado del cliente.
- Generación criptográfica, longitud 4–64, pools activables, exclusión de caracteres y garantía de al menos un carácter por pool activo.
- Regeneración automática + botón "Actualizar", campos Copiar/Guardar, salida única readonly y medidor de fortaleza.
- Compartir la lógica de Copiar/Guardar con el formateador vía helpers reutilizables.

**Non-Goals:**
- Persistencia de contraseñas, historial, múltiples contraseñas a la vez ni gestión de credenciales.
- Servidor, API o autenticación.
- Customización del nombre del archivo (siempre `password.txt`).

## Decisions

### Algoritmo de generación con garantía de presencia
**Decisión**: Construir el pool uniendo los pools activos y quitando los caracteres excluidos. Generar con:
1. Un carácter por cada pool activo (garantía) elegido con `crypto.getRandomValues`.
2. Rellenar el resto de la longitud desde el pool unido.
3. Barajar el resultado final con Fisher–Yates usando la misma fuente criptográfica.

**Razón**: Implementa la Opción A (elegida por el usuario): si un pool está activo, la contraseña siempre contiene al menos un carácter de él, sin desviarse de la longitud configurada.

### Distribución uniforme con algoritmo de rechazo
**Decisión**: Para muestrear del pool con `crypto.getRandomValues` sin sesgo, descartar valores aleatorios fuera de `floor(256 / poolSize) * poolSize` (rejection sampling) y dividir el resto por ese tope.

**Razón**: `getRandomValues` devuelve bytes uniformes; el descarte evita el sesgo de módulo. Sin esto, algunos caracteres serían más probables que otros.

### Alternativa del generador examinada
| Opción | Pros | Contras |
|--------|------|---------|
| **`crypto.getRandomValues` + rechazo** ✅ | Seguro, sin dependencias, distribución uniforme | Un par de líneas extra de matemática |
| `Math.random` | Simple | No apto para contraseñas |
| Librería externa (p.ej. generate-password) | Directo | Dependencia innecesaria, no es proposito del sitio |

### Guardado en archivo de texto
**Decisión**: Botón "Guardar" que descarga la contraseña actual como `password.txt` usando `Blob({ type: 'text/plain' })`, `URL.createObjectURL`, un `<a download>` programático y `URL.revokeObjectURL` tras el click. El nombre fijo `password.txt` es una decisión del usuario.

**Razón**: Mismo patrón de descarga que el formateador, sin servidor ni librerías.

### Helpers reutilizables de Copiar y Descargar
**Decisión**: Crear `src/lib/clipboard.ts` con `copyText(texto): Promise<void>` (usa `navigator.clipboard.writeText` con fallback a `textarea` temporal + `document.execCommand('copy')`) y `src/lib/download.ts` con `downloadBlob(blob, nombre)` (patrón createObjectURL/revoke). `JsonFormatter.astro` se refactoriza para usarlos y `PasswordGenerator.astro` los reutiliza. Refactor de comportamiento neutral: la spec de `tools/json-formatter` no cambia.

**Alternativas consideradas:**
| Opción | Pros | Contras |
|--------|------|---------|
| **Helpers en `src/lib/`** ✅ | Una sola implementación, ambas herramientas la usan | Refactor leve del formateador ya hecho |
| Duplicar en cada componente | No toca el formateador | Doble mantenimiento, se rompe la consistencia |

### UI y regeneración
**Decisión**: `PasswordGenerator.astro` con script inline (patrón del formateador) y: slider de longitud 4–64 con número visible + atajos 8/12/16/20, 4 checkboxes de pools, campo "Excluir caracteres", salida única readonly, botones Actualizar / Copiar / Guardar, indicador de fortaleza y panel de error. Se genera al cargar la página y se regenera al cambiar cualquier opción o presionar Actualizar. Sin pools activos o pool vacío por exclusión: no se genera y se muestra error.

**Razón**: Cubre los escenarios de la spec con controles mínimos, sin dependencias, y copia los patrones de UX ya validados del formateador (errores con `role="alert"`, estilo `btn btn-primary`/`btn`).

### Set de símbolos por defecto
**Decisión**: El pool de símbolos es `!@#$%^&*()-_=+[]{}` (15 caracteres). Se eliminaron del set original `; : , . ?` por ser "símbolos finos": glifos diminutos que en monospace con `letter-spacing` se agrupan y se leen como comas repetidas, y por ser los menos soportados por sistemas externos.

**Alternativas consideradas:**
| Opción | Pros | Contras |
|--------|------|---------|
| **Set sin finos** ✅ | Legible, bien soportado, sin percepción de "chorro de comas" | 15 símbolos en vez de 21 (entropía marginal) |
| Mantener `;:,.?` | Un poco más de variedad | Se percibe como basura visual |
| Dos sets de símbolos | Máximo control | Más UI para un beneficio mínimo |

**Razón**: la pérdida de entropía por quitar 5 signos es mínima; si algún día se quiere más variedad, la opción de dos sets queda documentada como alternativa futura.

> **Causa raíz encontrada en aplicación**: el "chorro de comas" que motivó este ajuste no era solo percepción — era un bug real. `filtered` se construía como `pool.split('').filter(...)` (array de arrays) y `filtered.join('')` serializa cada sub-array con `Array#toString()`, que une sus elementos con `,` ⇒ se inyectaba una coma entre cada par de caracteres del pool (~50% del pool eran comas). Fix: filtrar cada pool y volverlo **string** con `[...pool].filter((c) => !excluded.includes(c)).join('')`, de modo que `filtered` sea un array de strings y `join('')` concatene sin inyectar nada. La uniformidad del muestreo era y sigue siendo correcta; el bug estaba en la construcción del pool unido.

### Símbolos finos opcionales
**Decisión**: Checkbox "Símbolos finos (; : , . ?)" desmarcado por defecto. Al marcarlo, amplía el pool de símbolos actual (`!@#$%^&*()-_=+[]{}`) al set completo (`!@#$%^&*()-_=+[]{};:,.?`). NO es un pool obligatorio de presencia.

**Razón**: un 5º pool mandatorio rompería el invariante longitud mínima 4 ≥ nº pools garantizados (5 > 4 => imposible). Ampliar un pool existente conserva la garantía y los 4 pools máx. Además, con el bug de las comas corregido, los símbolos finos aparecen con su frecuencia natural (~1/80), sin el efecto "chorro de comas".

**Interacción con exclusión**: si ambos activos, el pool se amplía primero y luego "Excluir caracteres" filtra igual que siempre (coherente, sin casos nuevos).

### Medidor de fortaleza
**Decisión**: Indicador con tres niveles calculado por diversidad (cantidad de pools activos) y longitud: fuerte (4 pools y ≥20), media (≥2 pools y ≥8), débil (demás casos; nulo si no hay contraseña).

**Razón**: Jerarquía simple y explicable, sin fórmulas opacas de entropía.

## Risks / Trade-offs

- **[Riesgo] `navigator.clipboard` no disponible en HTTP** → Mitigación: fallback con textarea temporal + `document.execCommand('copy')` en el helper compartido.
- **[Riesgo] Pool muy pequeño tras la exclusión** → El algoritmo de rechazo escala bien; el guion de error evita generar con pool vacío.
- **[Trade-off] Refactor del formateador** → Toca código ya validado; mitigación: cambio estrictamente de extracción (misma libs). El build y la prueba manual del formateador se corren antes y después.
- **[Riesgo] `crypto.getRandomValues` requiere contexto seguro** → Disponible en `https:` y `localhost`; el fallback está documentado, no hay alternativas seguras reales.

## Migration Plan

1. Crear `src/lib/clipboard.ts` y `src/lib/download.ts`.
2. Refactorizar `JsonFormatter.astro` para usar `copyText` y `downloadBlob`; verificar build.
3. Crear `src/components/PasswordGenerator.astro` (pools, exclusión, generación, medidor, controles).
4. Crear `src/pages/tools/password-generator.astro` con `ToolLayout`.
5. Actualizar `src/data/tools.ts` (entrada `password-generator` con `status: 'available'` y ruta base-correcta).
6. Build local con `npm run build`, revisar en `dist/` la ruta `/portafolio/tools/password-generator/`. Rollback: git revert del commit. No hay migración de datos.

## Open Questions

Sin preguntas abiertas: las decisiones (set de símbolos estándar, regeneración automática + botón, slider 4–64 con atajos, medidor incluido, helpers compartidos, archivo `password.txt`) están resueltas con el usuario.