# Portfolio Deploy Specification

## Purpose

Definir el pipeline de despliegue automático del sitio en GitHub Pages.

## Requirements

### Requirement: Deploy automático
El sitio SHALL desplegarse automáticamente en GitHub Pages al hacer push a la rama principal.

#### Scenario: Push a main
- **WHEN** se hace push de cambios a la rama main
- **THEN** GitHub Actions ejecuta el build y despliega el sitio automáticamente

### Requirement: Build exitoso
El build SHALL completarse sin errores antes de desplegar.

#### Scenario: Build falla
- **WHEN** el build falla por errores de compilación
- **THEN** el despliegue no se realiza y se notifica el error

### Requirement: URL de despliegue
El sitio SHALL estar disponible en la URL de GitHub Pages del repo.

#### Scenario: Acceso al sitio
- **WHEN** el despliegue se completa exitosamente
- **THEN** el sitio está disponible en https://litospuc.github.io

### Requirement: Rollback
El sistema SHALL permitir revertir a una versión anterior del sitio.

#### Scenario: Rollback manual
- **WHEN** un deploy anterior causó problemas
- **THEN** se puede hacer checkout de un commit anterior y redeploy