import * as productDataLayer from '../data/productData.js';

const getAllProducts = async () => {
  return await productDataLayer.getAllProducts();
};

const getProductById = async (id) => {
  return await productDataLayer.getProductById(id);
};

const createProduct = async (productInfo) => {
  if (!productInfo.name || productInfo.name.trim().length < 3) {
    throw new Error('El nombre debe tener al menos 3 caracteres');
  }
  
  if (!productInfo.price || productInfo.price <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  
  const processedProduct = {
    ...productInfo,
    name: productInfo.name.trim(),
    price: Number(productInfo.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return await productDataLayer.createProduct(processedProduct);
};

const updateProduct = async (id, productUpdates) => {
  if (productUpdates.name && productUpdates.name.trim().length < 3) {
    throw new Error('El nombre debe tener al menos 3 caracteres');
  }
  
  if (productUpdates.price && productUpdates.price <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  
  productUpdates.updatedAt = new Date().toISOString();
  
  return await productDataLayer.updateProduct(id, productUpdates);
};

const deleteProduct = async (id) => {
  return await productDataLayer.deleteProduct(id);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
