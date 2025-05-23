import { userRepository } from '../repositories/user.repository.js';


class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.repository.getUsers();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.getUserById(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.repository.createUser(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.updateUser(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.repository.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userRepository);