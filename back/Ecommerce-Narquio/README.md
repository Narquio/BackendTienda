# BackendTienda

API REST de e-commerce construida con NestJS, TypeORM y PostgreSQL. Incluye autenticación con JWT, gestión de productos y órdenes con control transaccional de stock, y carga de imágenes a Cloudinary.

REST API for an e-commerce store built with NestJS, TypeORM and PostgreSQL. Features JWT authentication, product and order management with transactional stock control, and image uploads to Cloudinary.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

## Funcionalidades / Features

- Registro y login con JWT y contraseñas hasheadas
- CRUD de productos y categorías
- Órdenes con validación de stock y decremento atómico dentro de transacciones
- Subida de imágenes con Cloudinary
- Documentación interactiva con Swagger
- Validación de DTOs con class-validator

## Stack

NestJS · TypeScript · TypeORM · PostgreSQL · JWT · Cloudinary · Swagger · Docker

## Instalación / Setup

```bash
git clone https://github.com/Narquio/BackendTienda.git
cd BackendTienda
npm install
cp .env.example .env
npm run start:dev
```

## Variables de entorno / Environment variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Documentación de la API / API docs

Con el servidor corriendo: `http://localhost:3000/api`

## Autor / Author

**Nar** · Full Stack Developer · Buenos Aires, Argentina
[GitHub](https://github.com/Narquio)
