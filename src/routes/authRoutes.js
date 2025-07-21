import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Credenciales de prueba (en producción esto vendría de una base de datos)
const TEST_USERS = [
  {
    id: 'user123',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin'
  },
  {
    id: 'user456',
    email: 'user@test.com',
    password: '123456',
    role: 'user'
  }
];

const findUserByCredentials = (email, password) => {
  return TEST_USERS.find(user => user.email === email && user.password === password);
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email y contraseña son requeridos' 
      });
    }
    
    const user = findUserByCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }
    
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      message: 'Login exitoso',
      token: token,
      user: { 
        id: user.id,
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, contraseña y nombre son requeridos' 
      });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = TEST_USERS.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'El usuario ya existe' 
      });
    }
    
    const newUserId = 'user_' + Date.now();
    
    const token = jwt.sign(
      { 
        id: newUserId,
        email: email, 
        role: 'user' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      token: token,
      user: { 
        id: newUserId,
        email: email, 
        name: name,
        role: 'user' 
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al registrar usuario' 
    });
  }
});

router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token no proporcionado' 
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.json({ 
      success: true, 
      message: 'Token válido',
      user: decoded 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
});

export default router;
