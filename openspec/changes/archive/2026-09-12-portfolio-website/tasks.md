## 1. Setup del proyecto

- [x] 1.1 Inicializar proyecto Astro con `npm create astro@latest`
- [x] 1.2 Configurar el proyecto con TypeScript y formato según preferencias
- [x] 1.3 Crear estructura de carpetas: src/pages, src/components, src/layouts
- [x] 1.4 Configurar Astro.config.mjs para output estático

## 2. Layout base

- [x] 2.1 Crear layout principal en src/layouts/BaseLayout.astro
- [x] 2.2 Crear componente Header.astro con navegación
- [x] 2.3 Crear componente Footer.astro con información básica
- [x] 2.4 Implementar menú hamburguesa para móvil

## 3. Tema y estilos

- [x] 3.1 Configurar sistema de temas (oscuro/claro) con CSS variables
- [x] 3.2 Implementar modo oscuro por defecto (#0a0a0a fondo, texto claro)
- [x] 3.3 Crear botón de cambio de tema en el header
- [x] 3.4 Asegurar responsive design con breakpoints: 768px, 1024px

## 4. Contenido: Sobre mí

- [x] 4.1 Crear componente About.astro
- [x] 4.2 Agregar sección de nombre y foto/avatar
- [x] 4.3 Agregar bio breve (2-3 oraciones placeholder)
- [x] 4.4 Estilos para la sección About

## 5. Contenido: Habilidades

- [x] 5.1 Crear componente Skills.astro
- [x] 5.2 Definir estructura de datos para habilidades (categorías)
- [x] 5.3 Renderizar habilidades agrupadas (Frontend, Backend, Herramientas)
- [x] 5.4 Estilos para tarjetas de habilidades

## 6. Contenido: Proyectos

- [x] 6.1 Crear componente Projects.astro
- [x] 6.2 Crear componente ProjectCard.astro
- [x] 6.3 Mostrar mensaje placeholder cuando no hay proyectos
- [x] 6.4 Estilos para tarjetas de proyecto

## 7. Contenido: Contacto

- [x] 7.1 Crear componente Contact.astro
- [x] 7.2 Agregar links a email, LinkedIn, GitHub
- [x] 7.3 Crear formulario de contacto básico (nombre, email, mensaje)
- [x] 7.4 Estilos para sección de contacto

## 8. Página principal

- [x] 8.1 Crear página principal en src/pages/index.astro
- [x] 8.2 Ensamblar todas las secciones en la página
- [x] 8.3 Implementar scroll suave entre secciones
- [x] 8.4 Verificar que todos los links de navegación funcionan

## 9. Deploy

- [x] 9.1 Crear archivo .github/workflows/deploy.yml
- [x] 9.2 Configurar GitHub Actions para build y deploy a GitHub Pages
- [x] 9.3 Hacer push a repo en GitHub
- [x] 9.4 Activar GitHub Pages en Settings → Pages → Source: GitHub Actions
- [x] 9.5 Verificar que el sitio está disponible en https://litospuc.github.io

## 10. Pulido final

- [x] 10.1 Revisar responsive en diferentes tamaños de pantalla
- [x] 10.2 Verificar performance (carga < 3 segundos)
- [x] 10.3 Agregar meta tags para SEO básico
- [x] 10.4 Agregar favicon
