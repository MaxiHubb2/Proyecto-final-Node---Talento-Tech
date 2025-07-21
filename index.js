import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

// Servir archivos estáticos
app.use(express.static('.'));

// Ruta básica
app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando con estructura MVC',
    environment: process.env.NODE_ENV || 'development',
    firebaseConfigured: !!(process.env.FIREBASE_PROJECT_ID),
    availableEndpoints: [
      'GET /api/products - Obtener todos los productos',
      'GET /api/products/:id - Obtener producto por ID',
      'POST /api/products/create - Crear producto',
      'PUT /api/products/:id - Actualizar producto',
      'DELETE /api/products/:id - Eliminar producto',
      'POST /api/auth/login - Iniciar sesión',
      'POST /api/auth/register - Registrar usuario'
    ]
  });
});

// Ruta para servir la interfaz HTML
app.get('/test-api.html', (req, res) => {
  try {
    const htmlPath = path.join(process.cwd(), 'test-api.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    res.status(404).json({ error: 'Archivo HTML no encontrado' });
  }
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

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

// Para Vercel
export default app;