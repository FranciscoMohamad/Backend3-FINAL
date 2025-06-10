# Backend Ecommerce - PreEntrega

## Descripción

Este proyecto es un backend para un sistema de ecommerce desarrollado en Node.js con Express y MongoDB. Incluye autenticación JWT, autorización por roles, sistema de recuperación de contraseña, generación de datos mockeados para pruebas y arquitectura profesional con DTOs, middlewares y separación de capas.

---

## Funcionalidades principales

- **Registro y login de usuarios** con JWT.
- **Autorización por roles**: solo admin puede crear/editar/eliminar productos, solo user puede agregar productos al carrito.
- **Recuperación de contraseña** vía email (Ethereal para pruebas).
- **DTOs** para exponer solo los datos necesarios.
- **Mocking de datos**: endpoints para generar usuarios y mascotas de prueba.
- **Carga masiva de usuarios y mascotas** en la base de datos.
- **Endpoints REST** para usuarios, productos, carritos y mocking.

---

### Clonar el repositorio

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```
