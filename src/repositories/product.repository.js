import { productDao } from '../daos/mongodb/product-dao.js';
import CustomError from '../utils/custom-error.js';

class ProductRepository {
  async getById(id) {
    const product = await productDao.getById(id);
    if (!product) throw new CustomError('Producto no encontrado', 404);
    return product;
  }

  async getAll() {
    return await productDao.getAll();
  }

  async create(data) {
    if (!data.name || !data.price) {
      throw new CustomError('Faltan campos obligatorios', 400);
    }
    const existing = await productDao.getAll();
    if (existing.some(p => p.name === data.name)) {
      throw new CustomError('Ya existe un producto con ese nombre', 409);
    }
    return await productDao.create(data);
  }

  async update(id, data) {
    const product = await productDao.getById(id);
    if (!product) throw new CustomError('Producto no encontrado', 404);
    return await productDao.update(id, data);
  }

  async delete(id) {
    const product = await productDao.getById(id);
    if (!product) throw new CustomError('Producto no encontrado', 404);
    return await productDao.delete(id);
  }
}

export const productRepository = new ProductRepository();