# JSON Cleaner Specification

## Purpose

Define el comportamiento del limpiador de JSON, una herramienta 100% del lado del cliente que quita las diagonales de escape (`\"`, `\/`, `\\`) de un JSON encapsulado dentro de otro string y lo deja como JSON válido formateado y listo para copiar o guardar.

## Requirements

### Requirement: Entrada y salida de JSON limpiado
La herramienta SHALL ofrecer un área de entrada para pegar el texto con diagonales de escape y un área de salida de solo lectura con el JSON limpio y formateado.

#### Scenario: Entrada de texto
- **WHEN** el usuario pega un texto con diagonales de escape en el área de entrada
- **THEN** el texto permanece editable y sin procesar hasta que el usuario ejecute la limpieza

#### Scenario: Salida del resultado
- **WHEN** la limpieza se completa correctamente
- **THEN** el área de salida muestra el JSON sin escapes, formateado según la indentación seleccionada

### Requirement: Quitar diagonales de escape por capas
La herramienta SHALL eliminar las diagonales de escape del texto de entrada, decodificando una o más capas hasta obtener JSON válido, preservando los escapes legítimos dentro de los valores de cadena.

#### Scenario: JSON con diagonales de escape
- **WHEN** el usuario ejecuta la limpieza sobre un JSON encapsulado con diagonales de escape como `\"clave\"`, `\/` o `\\`
- **THEN** el resultado muestra el JSON con las diagonales de escape eliminadas y los valores de cadena ("08/2018", "MÉRIDA") intactos

#### Scenario: Múltiples capas de escape
- **WHEN** el texto de entrada tiene más de una capa de escape
- **THEN** la herramienta decodifica capa por capa hasta obtener un JSON válido

#### Scenario: JSON ya válido
- **WHEN** el texto de entrada ya es un JSON válido sin diagonales de escape
- **THEN** la herramienta lo formatea tal cual, sin alterar su contenido

### Requirement: Formateo del resultado con indentación configurable
La herramienta SHALL formatear el JSON limpio con indentación seleccionable entre 2 espacios, 4 espacios o un tab.

#### Scenario: Formateo con 2 espacios
- **WHEN** el usuario elige indentación de 2 espacios y ejecuta la limpieza sobre un JSON válido
- **THEN** el área de salida muestra el JSON limpio con cada nivel de anidación indentado con 2 espacios

#### Scenario: Formateo con 4 espacios
- **WHEN** el usuario elige indentación de 4 espacios y ejecuta la limpieza sobre un JSON válido
- **THEN** el área de salida muestra el JSON limpio con cada nivel de anidación indentado con 4 espacios

#### Scenario: Formateo con tab
- **WHEN** el usuario elige indentación de tab y ejecuta la limpieza sobre un JSON válido
- **THEN** el área de salida muestra el JSON limpio con cada nivel de anidación indentado con un carácter de tab

### Requirement: Validación de texto no limpiable
La herramienta SHALL validar el texto de entrada y mostrar un mensaje de error claro cuando no pueda quitar las diagonales de escape.

#### Scenario: Texto no limpiable
- **WHEN** el usuario ejecuta la limpieza sobre un texto que no corresponde a un JSON encapsulado
- **THEN** el área de salida permanece sin resultado procesado y se muestra un mensaje de error indicando que el texto no puede limpiarse

#### Scenario: Entrada vacía
- **WHEN** el usuario ejecuta la limpieza con el área de entrada vacía
- **THEN** se muestra un mensaje de error indicando que no hay texto para procesar

### Requirement: Copiar resultado al portapapeles
La herramienta SHALL permitir copiar el resultado del área de salida al portapapeles.

#### Scenario: Copiado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de copiar
- **THEN** el contenido del área de salida se copia al portapapeles del usuario

#### Scenario: Copiado sin resultado
- **WHEN** el usuario presiona el botón de copiar sin haber procesado ningún resultado
- **THEN** no se copia nada y se muestra un mensaje de error indicando que no hay resultado para copiar

### Requirement: Guardar resultado como archivo JSON
La herramienta SHALL permitir descargar el resultado del área de salida como un archivo `.json`.

#### Scenario: Guardado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de guardar
- **THEN** se descarga un archivo `.json` cuyo contenido es el resultado del área de salida

#### Scenario: Guardado sin resultado
- **WHEN** el usuario presiona el botón de guardar sin haber procesado ningún resultado
- **THEN** no se descarga ningún archivo y se muestra un mensaje de error indicando que no hay resultado para guardar

### Requirement: Limpiar la herramienta
La herramienta SHALL permitir borrar la entrada, la salida y los mensajes de error de una sola vez.

#### Scenario: Limpieza de campos
- **WHEN** el usuario presiona el botón de limpiar
- **THEN** el área de entrada, el área de salida y los mensajes de error quedan vacíos