# API REST - Gestión de Productos

API REST desarrollada con Node.js, Express y Firebase para gestionar productos con autenticación JWT.

## Instalación

```bash
npm install
npm start
```

## Cómo probar la API

### Opción 1: Interface web (recomendado)
1. Inicia el servidor con `npm start`
2. Abre el archivo `test-api.html` en tu navegador
3. Utiliza la interface para probar todos los endpoints

### Opción 2: Cliente REST (Postman, Thunder Client, etc.)
- URL base: `http://localhost:3000`
- Documentación detallada disponible en `DOCUMENTATION.md`

## Credenciales de prueba
- Email: `admin@test.com`
- Contraseña: `123456`

## Estructura del proyecto
```
├── index.js                 # Servidor principal
├── test-api.html           # Interface de prueba
├── EXPLICACION-SIMPLE.md   # Documentación de la API
├── vercel.json             # Configuración para deployment
└── src/
    ├── controllers/        # Controladores HTTP
    ├── services/          # Lógica de negocio
    ├── data/              # Acceso a datos (Firebase)
    ├── models/            # Modelos de datos
    ├── middleware/        # Middlewares personalizados
    └── routes/            # Definición de rutas
```

## Endpoints principales
- `GET /` - Información de la API
- `POST /api/auth/login` - Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `GET /api/products` - Listar productos
- `POST /api/products/create` - Crear producto
- `GET /api/products/:id` - Obtener producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
