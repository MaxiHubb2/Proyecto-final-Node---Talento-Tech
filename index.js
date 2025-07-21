import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurar body-parser para interpretar JSON
app.use(bodyParser.json());

// Ruta básica
app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando con estructura MVC',
    availableEndpoints: [
      'GET /api/products - Obtener todos los productos',
      'GET /api/products/:id - Obtener producto por ID',
      'POST /api/products/create - Crear producto',
      'PUT /api/products/:id - Actualizar producto',
      'DELETE /api/products/:id - Eliminar producto',
      'POST /api/auth/login - Iniciar sesión',
      'POST /api/auth/register - Registrarse'
    ]
  });
});

// Configurar rutas
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Middleware para rutas desconocidas (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;