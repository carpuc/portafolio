# Toolbox Specification

## Purpose

Define cómo la página principal se presenta como una caja de herramientas de programador: un hero de presentación, una cuadrícula de tarjetas de herramientas y navegación hacia cada herramienta, cumpliendo el rol de portafolio.

## Requirements

### Requirement: Página principal como caja de herramientas
La página principal del sitio SHALL presentarse como una caja de herramientas de programación que funge como portafolio del autor.

#### Scenario: Hero de presentación
- **WHEN** un usuario visita la página principal
- **THEN** se muestra un hero con el nombre y un título breve del autor del sitio

#### Scenario: Vitrina de herramientas
- **WHEN** un usuario visita la página principal
- **THEN** se muestra una sección con una cuadrícula de tarjetas de herramientas, donde cada tarjeta muestra nombre, descripción y enlace a la herramienta

### Requirement: Grid de herramientas
El sitio SHALL mostrar un grid de tarjetas de herramientas donde cada tarjeta enlaza a su ruta correspondiente.

#### Scenario: Herramienta disponible
- **WHEN** una herramienta está publicada y el usuario hace click en su tarjeta
- **THEN** el usuario es llevado a la ruta de esa herramienta

#### Scenario: Herramienta no disponible aún
- **WHEN** una herramienta aún no está disponible
- **THEN** su tarjeta se muestra con un indicador de "Próximamente" y no enlaza a una ruta inexistente

### Requirement: Navegación a herramientas
La barra de navegación del sitio SHALL incluir acceso a la sección de herramientas.

#### Scenario: Link de herramientas en el header
- **WHEN** un usuario navega el sitio desde cualquier página
- **THEN** la barra de navegación incluye un enlace "Herramientas" que apunta a la sección de herramientas de la página principal

### Requirement: Sección de proyectos retirada de la página principal
La página principal SHALL NO mostrar la sección de proyectos como vitrina principal, reemplazada por el grid de herramientas.

#### Scenario: Ausencia de la sección de proyectos
- **WHEN** un usuario visita la página principal
- **THEN** la sección de proyectos no aparece como parte del contenido principal