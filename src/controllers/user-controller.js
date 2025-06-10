import { userRepository } from '../repositories/user.repository.js';
import { UserDTO } from '../dtos/user.dto.js';

class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.repository.getAll();
      const usersDTO = users.map(user => new UserDTO(user));
      res.status(200).json(usersDTO);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.repository.getById(id);
      res.status(200).json(new UserDTO(user));
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const user = await this.repository.create(req.body);
      res.status(201).json(new UserDTO(user));
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.repository.update(id, req.body);
      res.status(200).json(new UserDTO(user));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.repository.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userRepository);