# Portfolio Content Specification

## Purpose

Definir el contenido del portafolio: secciones de información personal, habilidades, proyectos y contacto.

## Requirements

### Requirement: Sección "Sobre mí"
El sitio SHALL incluir una sección de presentación personal con foto y bio breve.

#### Scenario: Bio del usuario
- **WHEN** un usuario visita la página principal
- **THEN** se muestra una sección "Sobre mí" con nombre, foto/avatar, y una breve descripción (2-3 oraciones)

### Requirement: Sección de habilidades
El sitio SHALL mostrar las habilidades técnicas del usuario agrupadas por categoría.

#### Scenario: Lista de habilidades
- **WHEN** un usuario hace scroll o navega a la sección de habilidades
- **THEN** se muestran las tecnologías conocidas agrupadas (ej: Frontend, Backend, Herramientas)

### Requirement: Sección de proyectos
El sitio SHALL incluir una sección de proyectos que muestre trabajos realizados.

#### Scenario: Proyectos disponibles
- **WHEN** un usuario navega a la sección de proyectos
- **THEN** se muestran tarjetas con imagen, nombre, descripción y links (repo, demo) de cada proyecto

#### Scenario: Sin proyectos
- **WHEN** no hay proyectos para mostrar
- **THEN** se muestra un mensaje indicando que los proyectos estarán disponibles pronto

### Requirement: Sección de contacto
El sitio SHALL proporcionar formas de contactar al usuario.

#### Scenario: Información de contacto
- **WHEN** un usuario navega a la sección de contacto
- **THEN** se muestran links a email, LinkedIn, GitHub y un formulario de contacto básico

### Requirement: Scroll suave entre secciones
El sitio SHALL permitir navegación suave entre secciones de la página principal.

#### Scenario: Click en navegación
- **WHEN** un usuario hace click en un link de navegación
- **THEN** la página hace scroll suave hasta la sección correspondiente