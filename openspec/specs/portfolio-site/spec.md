# Portfolio Site Specification

## Purpose

Define la estructura base del sitio web del portafolio: layout, navegación, configuración de Astro y apariencia visual.

## Requirements

### Requirement: Layout base del sitio
El sitio SHALL tener un layout consistente en todas las páginas con header, contenido principal y footer.

#### Scenario: Layout en todas las páginas
- **WHEN** un usuario visita cualquier página del sitio
- **THEN** se muestra un header con navegación, el contenido principal, y un footer

### Requirement: Navegación responsive
El sitio SHALL tener navegación que funcione en desktop y móvil.

#### Scenario: Navegación en desktop
- **WHEN** un usuario visita el sitio en una pantalla mayor a 768px
- **THEN** se muestra una barra de navegación horizontal con links a todas las secciones

#### Scenario: Navegación en móvil
- **WHEN** un usuario visita el sitio en una pantalla menor a 768px
- **THEN** se muestra un menú hamburguesa que al hacer click despliega los links de navegación

### Requirement: Modo oscuro por defecto
El sitio SHALL usar tema oscuro como predeterminado con opción de cambiar a claro.

#### Scenario: Tema inicial
- **WHEN** un usuario visita el sitio por primera vez
- **THEN** el fondo es oscuro (#0a0a0a o similar) con texto claro

#### Scenario: Cambio de tema
- **WHEN** el usuario hace click en el botón de cambio de tema
- **THEN** el sitio alterna entre modo oscuro y claro

### Requirement: Responsive design
El sitio SHALL ser completamente responsive en todos los tamaños de pantalla.

#### Scenario: En tablet
- **WHEN** el sitio se muestra en pantalla de 768px a 1024px
- **THEN** el layout se adapta manteniendo legibilidad y usabilidad

#### Scenario: En móvil
- **WHEN** el sitio se muestra en pantalla menor a 768px
- **THEN** el layout se apila verticalmente con tipografía legible

### Requirement: Performance
El sitio SHALL cargar en menos de 3 segundos en conexiones 3G.

#### Scenario: Carga rápida
- **WHEN** un usuario carga el sitio
- **THEN** el contenido visible aparece en menos de 2 segundos