# JSON Formatter Specification

## Purpose

Define el comportamiento del formateador de JSON, una herramienta 100% del lado del cliente que permite formatear y minimizar JSON con indentación configurable, orden alfabético de propiedades, guardado en archivo, validación de errores y copiado del resultado.

## Requirements

### Requirement: Entrada y salida de JSON
La herramienta SHALL ofrecer un área de entrada para pegar JSON y un área de salida de solo lectura con el resultado.

#### Scenario: Entrada de texto
- **WHEN** el usuario pega texto JSON en el área de entrada
- **THEN** el texto permanece editable y sin procesar hasta que el usuario ejecute una acción

### Requirement: Formateo de JSON con indentación configurable
La herramienta SHALL formatear el JSON de entrada con indentación seleccionable entre 2 espacios, 4 espacios o un tab.

#### Scenario: Formateo con 2 espacios
- **WHEN** el usuario elige indentación de 2 espacios y ejecuta formatear sobre un JSON válido
- **THEN** el área de salida muestra el JSON con cada nivel de anidación indentado con 2 espacios

#### Scenario: Formateo con 4 espacios
- **WHEN** el usuario elige indentación de 4 espacios y ejecuta formatear sobre un JSON válido
- **THEN** el área de salida muestra el JSON con cada nivel de anidación indentado con 4 espacios

#### Scenario: Formateo con tab
- **WHEN** el usuario elige indentación de tab y ejecuta formatear sobre un JSON válido
- **THEN** el área de salida muestra el JSON con cada nivel de anidación indentado con un carácter de tab

### Requirement: Minimizar JSON
La herramienta SHALL poder minimizar el JSON de entrada a una sola línea sin espacios innecesarios.

#### Scenario: Minimización de JSON válido
- **WHEN** el usuario ejecuta minimizar sobre un JSON válido
- **THEN** el área de salida muestra el JSON compacto en una sola línea, conservando su estructura y valores

### Requirement: Validación de JSON inválido
La herramienta SHALL validar el JSON de entrada y mostrar un mensaje de error claro cuando sea inválido.

#### Scenario: JSON inválido
- **WHEN** el usuario ejecuta formatear o minimizar sobre un texto que no es JSON válido
- **THEN** el área de salida permanece sin resultado procesado y se muestra un mensaje de error indicando que el texto no es JSON válido

#### Scenario: Entrada vacía
- **WHEN** el usuario ejecuta formatear o minimizar con el área de entrada vacía
- **THEN** se muestra un mensaje de error indicando que no hay texto para procesar

### Requirement: Orden alfabético de propiedades
La herramienta SHALL ofrecer una opción para ordenar alfabéticamente (A–Z, orden clásico) las propiedades del JSON en el resultado, de forma recursiva y sin alterar los arrays.

#### Scenario: Orden alfabético al formatear
- **WHEN** el usuario activa el orden alfabético y ejecuta formatear sobre un JSON válido con propiedades desordenadas
- **THEN** el área de salida muestra las propiedades de cada objeto ordenadas alfabéticamente en todos los niveles de anidación

#### Scenario: Orden alfabético al minimizar
- **WHEN** el usuario activa el orden alfabético y ejecuta minimizar sobre un JSON válido con propiedades desordenadas
- **THEN** el área de salida muestra el JSON compacto con las propiedades de cada objeto ordenadas alfabéticamente

#### Scenario: Arrays intactos con orden alfabético
- **WHEN** el orden alfabético está activo y el JSON contiene arrays
- **THEN** los elementos de los arrays conservan su orden original

#### Scenario: Orden alfabético desactivado
- **WHEN** el usuario desactiva el orden alfabético y ejecuta formatear o minimizar
- **THEN** el resultado conserva el orden original de las propiedades

### Requirement: Guardar resultado como archivo JSON
La herramienta SHALL permitir descargar el resultado del área de salida como un archivo `.json`.

#### Scenario: Guardado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de guardar
- **THEN** se descarga un archivo `.json` cuyo contenido es el resultado del área de salida

#### Scenario: Guardado sin resultado
- **WHEN** el usuario presiona el botón de guardar sin haber procesado ningún resultado
- **THEN** no se descarga ningún archivo y se muestra un mensaje de error indicando que no hay resultado para guardar

### Requirement: Copiar resultado al portapapeles
La herramienta SHALL permitir copiar el resultado del área de salida al portapapeles.

#### Scenario: Copiado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de copiar
- **THEN** el contenido del área de salida se copia al portapapeles del usuario

### Requirement: Limpiar la herramienta
La herramienta SHALL permitir borrar la entrada, la salida y los mensajes de error de una sola vez.

#### Scenario: Limpieza de campos
- **WHEN** el usuario presiona el botón de limpiar
- **THEN** el área de entrada, el área de salida y los mensajes de error quedan vacíos