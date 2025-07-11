import { adoptionRepository } from '../repositories/adoption.repository.js';

class AdoptionController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async (req, res, next) => {
    try {
      const adoptions = await this.repository.getAll();
      res.status(200).json(adoptions);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const adoption = await this.repository.getById(id);
      res.status(200).json(adoption);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const adoption = await this.repository.create(req.body);
      res.status(201).json(adoption);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const adoption = await this.repository.update(id, req.body);
      res.status(200).json(adoption);
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

export const adoptionController = new AdoptionController(adoptionRepository);