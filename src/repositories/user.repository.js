import { userDao } from '../daos/mongodb/user-dao.js';

class UserRepository {
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

export const userRepository = new UserRepository(userDao);