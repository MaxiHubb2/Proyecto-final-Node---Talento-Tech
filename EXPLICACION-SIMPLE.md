# 🚀 API DOCUMENTATION - Con JWT

## 📋 **Información General**
- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json`
- **Autenticación:** JWT (JSON Web Token)
- **Token válido por:** 24 horas

## 🔐 **¿Cómo funciona la autenticación?**
1. **Haces login** → Recibes un **token JWT**
2. **Guardas el token** → Para próximas peticiones
3. **Rutas protegidas** → Requieren `Authorization: Bearer <token>`
4. **Admin vs User** → Solo admin puede crear/actualizar/eliminar productos

---MENTATION - Estilo Swagger

## 📋 **Información General**
- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json`
- **Autenticación:** Básica (email/password)

## � **¿Qué es cada cosa?**
- **Firebase:** Tu base de datos en la nube (gratis hasta cierto uso)
- **Vercel:** Para publicar tu API en internet (GRATIS) - opcional
- **HTML de prueba:** Para testear sin Postman

---

## 🔐 **AUTENTICACIÓN**

### POST `/api/auth/login`
**Descripción:** Iniciar sesión con credenciales

**Request Body:**
```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "email": "admin@test.com",
    "role": "admin"
  }
}
```

**Response 401:**
```json
{
  "success": false,
  "message": "Credenciales incorrectas"
}
```

### POST `/api/auth/register`
**Descripción:** Registrar nuevo usuario

**Request Body:**
```json
{
  "email": "nuevo@test.com",
  "password": "123456",
  "name": "Nombre Usuario"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1673456789",
    "email": "nuevo@test.com",
    "name": "Nombre Usuario",
    "role": "user"
  }
}
```

### POST `/api/auth/verify`
**Descripción:** Verificar si un token JWT es válido

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response 200:**
```json
{
  "success": true,
  "message": "Token válido",
  "user": {
    "id": "user123",
    "email": "admin@test.com",
    "role": "admin"
  }
}
```

**Response 401:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

## 📦 **PRODUCTOS**

### GET `/api/products`
**Descripción:** Obtener todos los productos *(pública - no requiere token)*

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "name": "Producto 1",
      "price": 100,
      "description": "Descripción del producto",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET `/api/products/:id`
**Descripción:** Obtener producto por ID *(pública - no requiere token)*

**Parámetros:**
- `id` (string): ID del producto

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "name": "Producto 1",
    "price": 100,
    "description": "Descripción del producto"
  }
}
```

**Response 404:**
```json
{
  "success": false,
  "error": "Producto no encontrado"
}
```

### POST `/api/products/create`
**Descripción:** Crear nuevo producto *(🔒 REQUIERE: Token JWT + Rol Admin)*

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nuevo Producto",
  "price": 150,
  "description": "Descripción opcional"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "nuevo123"
  },
  "message": "Producto creado exitosamente"
}
```

**Response 400:**
```json
{
  "success": false,
  "error": "Nombre y precio son requeridos"
}
```

### PUT `/api/products/:id`
**Descripción:** Actualizar producto existente *(🔒 REQUIERE: Token JWT + Rol Admin)*

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Parámetros:**
- `id` (string): ID del producto

**Request Body:**
```json
{
  "name": "Producto Actualizado",
  "price": 200,
  "description": "Nueva descripción"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": "abc123"
}
```

### DELETE `/api/products/:id`
**Descripción:** Eliminar producto *(🔒 REQUIERE: Token JWT + Rol Admin)*

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Parámetros:**
- `id` (string): ID del producto

**Response 200:**
```json
{
  "success": true,
  "data": "abc123"
}
```

## 🎯 **Códigos de Error HTTP**
- `200` - OK (todo bien)
- `201` - Created (creado exitosamente)
- `400` - Bad Request (faltan datos)
- `401` - Unauthorized (credenciales incorrectas)
- `404` - Not Found (no existe)
- `500` - Server Error (error del servidor)
