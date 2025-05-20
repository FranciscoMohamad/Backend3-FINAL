import { productDao } from '../daos/mongodb/product-dao.js';

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async getAll() {
    return this.dao.getAll();
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}

export const productRepository = new ProductRepository(productDao);