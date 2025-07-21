import productService from '../services/productService.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ success: false, error: 'ID requerido' });
    }
    
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    if (!productData.name || !productData.price) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nombre y precio son requeridos' 
      });
    }
    
    const newProductId = await productService.createProduct(productData);
    res.status(201).json({ 
      success: true, 
      data: { id: newProductId },
      message: 'Producto creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ success: false, error: 'ID requerido' });
    }
    
    const updateData = req.body;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, error: 'No hay datos para actualizar' });
    }
    
    const updatedProductId = await productService.updateProduct(id, updateData);
    const updatedProduct = await productService.getProductById(updatedProductId);
    
    res.json({ 
      success: true, 
      data: updatedProduct,
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: 'ID requerido' });
    }

    const result = await productService.deleteProduct(id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
