export class ProductModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.price = data.price || 0;
    this.description = data.description || '';
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  static fromFirebaseData(id, data) {
    return new ProductModel({ id, ...data });
  }
}

export default ProductModel;
