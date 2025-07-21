import express from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/ProductController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products - Obtener todos (público)
router.get('/', getAllProducts);

// POST /api/products/create - Crear (solo admin) - PRIMERO las rutas específicas
router.post('/create', verifyToken, verifyAdmin, createProduct);

// GET /api/products/:id - Obtener por ID (público) - DESPUÉS las rutas con parámetros
router.get('/:id', getProductById);

// PUT /api/products/:id - Actualizar (solo admin)
router.put('/:id', verifyToken, verifyAdmin, updateProduct);

// DELETE /api/products/:id - Eliminar (solo admin)
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;
