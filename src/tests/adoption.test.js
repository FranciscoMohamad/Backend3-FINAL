import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import adoptionRouter from '../routes/adoption-router.js';
import User from '../daos/mongodb/models/user-model.js';
import Pet from '../daos/mongodb/models/pet-model.js';
import Adoption from '../daos/mongodb/models/adoption-model.js';
import { setupDatabase, teardownDatabase, clearDatabase } from './setup.js';
import { errorHandler } from '../middlewares/error-handler.js';

const app = express();
app.use(express.json());
app.use('/api/adoptions', adoptionRouter);
app.use(errorHandler);

describe('Adoption Router Tests', () => {
  let userId, petId, adoptionId;

  beforeAll(async () => {
    await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
    
    const user = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@test.com',
      age: 25,
      password: 'hashedpassword',
      role: 'user'
    });
    userId = user._id;

    const pet = await Pet.create({
      name: 'Firulais',
      species: 'Dog',
      age: 3,
      adopted: false
    });
    petId = pet._id;
  });

  describe('POST /api/adoptions', () => {
    test('Debe crear una nueva adopción exitosamente', async () => {
      const adoptionData = {
        owner: userId,
        pet: petId,
        status: 'pending'
      };

      const response = await request(app)
        .post('/api/adoptions')
        .send(adoptionData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.owner).toBe(userId.toString());
      expect(response.body.pet).toBe(petId.toString());
      expect(response.body.status).toBe('pending');
      
      adoptionId = response.body._id;
    });

    test('Debe fallar al crear adopción sin datos requeridos', async () => {
      const response = await request(app)
        .post('/api/adoptions')
        .send({});

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/adoptions', () => {
    beforeEach(async () => {
      const adoption = await Adoption.create({
        owner: userId,
        pet: petId,
        status: 'pending'
      });
      adoptionId = adoption._id;
    });

    test('Debe obtener todas las adopciones', async () => {
      const response = await request(app)
        .get('/api/adoptions');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('owner');
      expect(response.body[0]).toHaveProperty('pet');
    });
  });

  describe('GET /api/adoptions/:id', () => {
    beforeEach(async () => {
      const adoption = await Adoption.create({
        owner: userId,
        pet: petId,
        status: 'pending'
      });
      adoptionId = adoption._id;
    });

    test('Debe obtener una adopción por ID', async () => {
      const response = await request(app)
        .get(`/api/adoptions/${adoptionId}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(adoptionId.toString());
      expect(response.body).toHaveProperty('owner');
      expect(response.body).toHaveProperty('pet');
    });

    test('Debe devolver 404 para adopción inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/adoptions/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/adoptions/:id', () => {
    beforeEach(async () => {
      const adoption = await Adoption.create({
        owner: userId,
        pet: petId,
        status: 'pending'
      });
      adoptionId = adoption._id;
    });

    test('Debe actualizar una adopción exitosamente', async () => {
      const updateData = {
        status: 'approved',
        adoptionDate: new Date()
      };

      const response = await request(app)
        .put(`/api/adoptions/${adoptionId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('approved');
      expect(response.body).toHaveProperty('adoptionDate');
    });

    test('Debe devolver 404 para adopción inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/adoptions/${fakeId}`)
        .send({ status: 'approved' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/adoptions/:id', () => {
    beforeEach(async () => {
      const adoption = await Adoption.create({
        owner: userId,
        pet: petId,
        status: 'pending'
      });
      adoptionId = adoption._id;
    });

    test('Debe eliminar una adopción exitosamente', async () => {
      const response = await request(app)
        .delete(`/api/adoptions/${adoptionId}`);

      expect(response.status).toBe(204);

      const deletedAdoption = await Adoption.findById(adoptionId);
      expect(deletedAdoption).toBeNull();
    });

    test('Debe devolver 404 para adopción inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/adoptions/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });
});