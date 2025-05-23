import { userDao } from '../daos/mongodb/user-dao.js';
import CustomError from '../utils/custom-error.js';

class UserRepository {
  async getById(id) {
    const user = await userDao.getById(id);
    if (!user) throw new CustomError('Usuario no encontrado', 404);
    return user;
  }

  async getAll() {
    return await userDao.getAll();
  }

  async create(data) {
    if (!data.email || !data.password) {
      throw new CustomError('Faltan campos obligatorios', 400);
    }
    const existing = await userDao.getAll();
    if (existing.some(u => u.email === data.email)) {
      throw new CustomError('Ya existe un usuario con ese email', 409);
    }
    return await userDao.create(data);
  }

  async update(id, data) {
    const user = await userDao.getById(id);
    if (!user) throw new CustomError('Usuario no encontrado', 404);
    return await userDao.update(id, data);
  }

  async delete(id) {
    const user = await userDao.getById(id);
    if (!user) throw new CustomError('Usuario no encontrado', 404);
    return await userDao.delete(id);
  }
}

export const userRepository = new UserRepository();