# XML Formatter Specification

## Purpose

Define el comportamiento del formateador de XML, una herramienta 100% del lado del cliente que permite formatear y minimizar XML con indentación configurable, validación de errores, guardado en archivo y copiado del resultado.

## Requirements

### Requirement: Entrada y salida de XML
La herramienta SHALL ofrecer un área de entrada para pegar XML y un área de salida de solo lectura con el resultado.

#### Scenario: Entrada de texto
- **WHEN** el usuario pega texto XML en el área de entrada
- **THEN** el texto permanece editable y sin procesar hasta que el usuario ejecute una acción

#### Scenario: Salida de solo lectura
- **WHEN** hay un resultado en el área de salida
- **THEN** el usuario no puede editar el texto mostrado en ella

### Requirement: Formateo de XML con indentación configurable
La herramienta SHALL formatear el XML de entrada con indentación seleccionable entre 2 espacios, 4 espacios o un tab.

#### Scenario: Formateo con 2 espacios
- **WHEN** el usuario elige indentación de 2 espacios y ejecuta formatear sobre un XML válido
- **THEN** el área de salida muestra el XML con cada nivel de anidación indentado con 2 espacios

#### Scenario: Formateo con 4 espacios
- **WHEN** el usuario elige indentación de 4 espacios y ejecuta formatear sobre un XML válido
- **THEN** el área de salida muestra el XML con cada nivel de anidación indentado con 4 espacios

#### Scenario: Formateo con tab
- **WHEN** el usuario elige indentación de tab y ejecuta formatear sobre un XML válido
- **THEN** el área de salida muestra el XML con cada nivel de anidación indentado con un carácter de tab

### Requirement: Minimizar XML
La herramienta SHALL poder minimizar el XML de entrada a una sola línea eliminando los espacios en blanco entre tags sin eliminar el texto contenido.

#### Scenario: Minimización de XML válido
- **WHEN** el usuario ejecuta minimizar sobre un XML válido
- **THEN** el área de salida muestra el XML compacto, conservando su estructura, atributos y valores de texto

### Requirement: Validación de XML inválido
La herramienta SHALL validar el XML de entrada y mostrar un mensaje de error claro cuando sea inválido.

#### Scenario: XML inválido
- **WHEN** el usuario ejecuta formatear o minimizar sobre un texto que no es XML bien formado
- **THEN** el área de salida permanece sin resultado procesado y se muestra un mensaje de error indicando que el texto no es XML válido

#### Scenario: Entrada vacía
- **WHEN** el usuario ejecuta formatear o minimizar con el área de entrada vacía
- **THEN** se muestra un mensaje de error indicando que no hay texto para procesar

### Requirement: Contenido mixto preservado
La herramienta SHALL preservar el contenido mixto (texto e hijos en un mismo elemento) sin introducir espacios en blanco que alteren su significado.

#### Scenario: Elemento con texto e hijos
- **WHEN** el usuario formatea un XML con un elemento que contiene texto e hijos (por ejemplo `<p>Hola <b>mundo</b></p>`)
- **THEN** el contenido de ese elemento se mantiene en una misma línea sin insertar espacios en blanco adicionales

### Requirement: Guardar resultado como archivo XML
La herramienta SHALL permitir descargar el resultado del área de salida como un archivo de texto plano llamado `datos.xml`.

#### Scenario: Guardado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de guardar
- **THEN** se descarga un archivo `datos.xml` cuyo contenido es el resultado del área de salida

#### Scenario: Guardado sin resultado
- **WHEN** el usuario presiona el botón de guardar sin haber procesado ningún resultado
- **THEN** no se descarga ningún archivo y se muestra un mensaje de error indicando que no hay resultado para guardar

### Requirement: Copiar resultado al portapapeles
La herramienta SHALL permitir copiar el resultado del área de salida al portapapeles.

#### Scenario: Copiado con resultado disponible
- **WHEN** hay un resultado procesado en el área de salida y el usuario presiona el botón de copiar
- **THEN** el contenido del área de salida se copia al portapapeles del usuario

#### Scenario: Copiado sin resultado
- **WHEN** el usuario presiona el botón de copiar sin haber procesado ningún resultado
- **THEN** se muestra un mensaje de error indicando que no hay resultado para copiar

### Requirement: Limpiar la herramienta
La herramienta SHALL permitir borrar la entrada, la salida y los mensajes de error de una sola vez.

#### Scenario: Limpieza de campos
- **WHEN** el usuario presiona el botón de limpiar
- **THEN** el área de entrada, el área de salida y los mensajes de error quedan vacíos