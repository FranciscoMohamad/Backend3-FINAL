import { userRepository } from '../repositories/user.repository.js';

class UserService {
  async getUserById(id) {
    return await userRepository.getById(id);
  }

  async getUsers() {
    return await userRepository.getAll();
  }

  async createUser(data) {
    return await userRepository.create(data);
  }

  async updateUser(id, data) {
    return await userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await userRepository.delete(id);
  }
}

export const userService = new UserService();