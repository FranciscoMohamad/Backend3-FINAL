import Adoption from '../daos/mongodb/models/adoption-model.js';
import CustomError from '../utils/custom-error.js';

class AdoptionRepository {
  async getAll() {
    return await Adoption.find().populate('owner').populate('pet');
  }

  async getById(id) {
    const adoption = await Adoption.findById(id).populate('owner').populate('pet');
    if (!adoption) throw new CustomError('Adopción no encontrada', 404);
    return adoption;
  }

  async create(data) {
    return await Adoption.create(data);
  }

  async update(id, data) {
    const adoption = await Adoption.findById(id);
    if (!adoption) throw new CustomError('Adopción no encontrada', 404);
    return await Adoption.findByIdAndUpdate(id, data, { new: true }).populate('owner').populate('pet');
  }

  async delete(id) {
    const adoption = await Adoption.findById(id);
    if (!adoption) throw new CustomError('Adopción no encontrada', 404);
    return await Adoption.findByIdAndDelete(id);
  }

  async getByUserId(userId) {
    return await Adoption.find({ owner: userId }).populate('pet');
  }

  async getByPetId(petId) {
    return await Adoption.find({ pet: petId }).populate('owner');
  }
}

export const adoptionRepository = new AdoptionRepository();