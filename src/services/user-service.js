import userDAO from '../daos/mongodb/user-dao.js';

class UserService {
  async createUser(data) {
    return await userDAO.create(data);
  }

  async getUsers() {
    return await userDAO.getAll();
  }

  async getUserById(id) {
    return await userDAO.getById(id);
  }

  async updateUser(id, data) {
    return await userDAO.update(id, data);
  }

  async deleteUser(id) {
    return await userDAO.delete(id);
  }
}

export default new UserService();