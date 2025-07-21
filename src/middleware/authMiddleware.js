import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Acceso denegado. Token requerido.' 
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
    
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
};

// Middleware para verificar si es admin
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: 'Acceso denegado. Se requieren permisos de administrador.' 
    });
  }
};

export default { verifyToken, verifyAdmin };
