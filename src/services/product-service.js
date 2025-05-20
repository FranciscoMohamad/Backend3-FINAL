import { productRepository } from '../repositories/product.repository.js';
import CustomError from '../utils/custom-error.js'; // Ajusta la ruta si es necesario

class ProductService {
  async getById(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new CustomError('Producto no encontrado', 404);
    }
    return product;
  }

  async getAll() {
    return await productRepository.getAll();
  }

  async create(data) {
    if (!data.name || !data.price) {
      throw new CustomError('Faltan campos obligatorios', 400);
    }
    const existing = await productRepository.getAll();
    if (existing.some(p => p.name === data.name)) {
      throw new CustomError('Ya existe un producto con ese nombre', 409);
    }
    return await productRepository.create(data);
  }

  async update(id, data) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new CustomError('Producto no encontrado', 404);
    }
    return await productRepository.update(id, data);
  }

  async delete(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new CustomError('Producto no encontrado', 404);
    }
    return await productRepository.delete(id);
  }
}

export const productService = new ProductService();