# TP Backend - E-commerce con Sistema de Adopciones

## Descripción

Proyecto final de Backend para un sistema de e-commerce que incluye funcionalidades de adopción de mascotas, gestión de usuarios, productos y carritos de compra.

## Características

- ✅ API REST completa con Express.js
- ✅ Base de datos MongoDB con Mongoose
- ✅ Autenticación JWT
- ✅ Sistema de adopciones de mascotas
- ✅ Documentación con Swagger
- ✅ Tests funcionales con Jest
- ✅ Dockerizado

## Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger
- Jest
- Docker

## Documentación API

La documentación completa de la API está disponible en `/api-docs` cuando el servidor está ejecutándose.

## Docker

La imagen de Docker está disponible en DockerHub:

**🐳 [franciscomohamad/tp-backend](https://hub.docker.com/r/franciscomohamad/tp-backend)**

### Ejecutar con Docker:

```bash
docker pull franciscomohamad/tp-backend:latest
docker run -p 8080:8080 --env-file .env franciscomohamad/tp-backend:latest
```
