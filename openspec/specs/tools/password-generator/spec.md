# Password Generator Specification

## Purpose

Define el comportamiento del generador de contraseñas, una herramienta 100% del lado del cliente para crear contraseñas seguras y configurables con garantía de incluir los tipos de caracteres elegidos.

## Requirements

### Requirement: Configuración de longitud de la contraseña
La herramienta SHALL permitir configurar la longitud de la contraseña de 4 a 64 caracteres mediante un slider con el valor numérico visible y atajos rápidos.

#### Scenario: Cambiar longitud con el slider
- **WHEN** el usuario ajusta el slider de longitud
- **THEN** la contraseña mostrada se regenera con exactamente la longitud seleccionada

#### Scenario: Atajos rápidos de longitud
- **WHEN** el usuario presiona un atajo de longitud (8, 12, 16 o 20)
- **THEN** la longitud se ajusta al valor del atajo y la contraseña se regenera

#### Scenario: Límites de longitud
- **WHEN** el usuario intenta configurar una longitud menor a 4 o mayor a 64
- **THEN** la herramienta la limita a 4 o 64 respectivamente

### Requirement: Selección de pools de caracteres
La herramienta SHALL ofrecer pools de caracteres activables: mayúsculas (A–Z), minúsculas (a–z), números (0–9) y símbolos (`!@#$%^&*()-_=+[]{}`).

#### Scenario: Activar un pool de caracteres
- **WHEN** el usuario activa un pool de caracteres y genera una contraseña
- **THEN** la contraseña contiene al menos un carácter de ese pool

#### Scenario: Ningún pool activo
- **WHEN** el usuario desactiva todos los pools de caracteres
- **THEN** no se genera ninguna contraseña y se muestra un mensaje de error pidiendo activar al menos un pool

### Requirement: Inclusión opcional de símbolos finos
La herramienta SHALL ofrecer un checkbox opcional que, al marcarse, amplíe el pool de símbolos con los caracteres `; : , . ?` (set completo). La herramienta SHALL NO marcarlo por defecto. Este checkbox no constituye un pool obligatorio adicional.

#### Scenario: Símbolos finos desmarcados
- **WHEN** el checkbox de símbolos finos está desmarcado y se genera una contraseña
- **THEN** la contraseña nunca contiene los caracteres `;`, `:`, `,`, `.` ni `?`

#### Scenario: Símbolos finos marcados
- **WHEN** el usuario marca el checkbox de símbolos finos y genera una contraseña
- **THEN** el pool de símbolos incluye `; : , . ?` y la contraseña puede contenerlos, sin exigir su presencia como pool obligatorio

#### Scenario: Garantía intacta con símbolos finos
- **WHEN** el checkbox de símbolos finos está marcado y se genera una contraseña de longitud 4 con los cuatro pools activos
- **THEN** la garantía sigue exigiendo una mayúscula, una minúscula, un número y un símbolo, y la longitud se mantiene en 4

### Requirement: Exclusión de caracteres
La herramienta SHALL permitir excluir caracteres específicos del pool mediante un campo de texto libre.

#### Scenario: Excluir caracteres del pool
- **WHEN** el usuario escribe caracteres en el campo de exclusión y genera una contraseña
- **THEN** ninguno de los caracteres excluidos aparece en la contraseña

#### Scenario: Exclusión que vacía el pool
- **WHEN** la exclusión deja vacío el pool de caracteres resultante
- **THEN** no se genera ninguna contraseña y se muestra un mensaje de error

### Requirement: Garantía de presencia de cada pool activo
La herramienta SHALL garantizar que la contraseña generada incluya al menos un carácter de cada pool activo, sin alterar la longitud configurada.

#### Scenario: Todos los pools activos
- **WHEN** los cuatro pools están activos y se genera una contraseña
- **THEN** la contraseña contiene al menos una mayúscula, una minúscula, un número y un símbolo, y su longitud es la configurada

### Requirement: Generación criptográfica
La herramienta SHALL generar contraseñas con un generador de números aleatorios criptográficamente seguro y sin sesgo en la distribución de caracteres.

#### Scenario: Generación con fuente criptográfica
- **WHEN** la herramienta genera una contraseña
- **THEN** se usa `crypto.getRandomValues` sobre el pool filtrado, sin privilegiar ningún carácter

### Requirement: Regeneración la contraseña
La herramienta SHALL regenerar la contraseña automáticamente al cambiar cualquier opción y mediante un botón "Actualizar", además de generar una al cargar la página.

#### Scenario: Generación inicial
- **WHEN** la herramienta se carga por primera vez
- **THEN** se muestra una contraseña generada con la configuración por defecto (todos los pools activos)

#### Scenario: Cambio de opción
- **WHEN** el usuario cambia cualquier opción (longitud, pools, exclusión)
- **THEN** la contraseña se regenera automáticamente sin presionar ningún botón

#### Scenario: Botón Actualizar
- **WHEN** el usuario presiona el botón Actualizar
- **THEN** se genera una nueva contraseña con la configuración actual

### Requirement: Salida de solo lectura
La herramienta SHALL mostrar la contraseña en un campo de salida único de solo lectura.

#### Scenario: Campo no editable
- **WHEN** el usuario intenta escribir o modificar el campo de salida
- **THEN** la herramienta no permite la edición del texto mostrado

### Requirement: Copiar contraseña
La herramienta SHALL permitir copiar la contraseña al portapapeles con un botón.

#### Scenario: Copiado con contraseña disponible
- **WHEN** hay una contraseña generada y el usuario presiona el botón Copiar
- **THEN** la contraseña se copia al portapapeles del usuario

### Requirement: Guardar contraseña en archivo de texto
La herramienta SHALL permitir descargar la contraseña como un archivo de texto plano llamado `password.txt`.

#### Scenario: Guardado con contraseña disponible
- **WHEN** hay una contraseña generada y el usuario presiona el botón Guardar
- **THEN** se descarga un archivo `password.txt` cuyo contenido es la contraseña actual

#### Scenario: Guardado sin contraseña
- **WHEN** no hay contraseña generada (por ejemplo, sin pools activos) y el usuario presiona Guardar
- **THEN** no se descarga ningún archivo y se muestra un mensaje de error

### Requirement: Medidor de fortaleza
La herramienta SHALL mostrar un indicador de fortaleza de la contraseña según la cantidad de pools activos y la longitud configurada.

#### Scenario: Alta diversidad y longitud
- **WHEN** los cuatro pools están activos y la longitud es de 20 o más
- **THEN** el medidor indica fortaleza fuerte

#### Scenario: Baja diversidad y longitud
- **WHEN** solo un pool está activo y la longitud es menor a 8
- **THEN** el medidor indica fortaleza débil