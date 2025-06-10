import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateMockUser } from '../mocks/userMocker.js';
import { generateMockPet } from '../mocks/petMocker.js';
import User from '../daos/mongodb/models/user-model.js';
import Pet from '../daos/mongodb/models/pet-model.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
  const pets = [];
  for (let i = 0; i < 50; i++) {
    pets.push({
      name: faker.animal.dog(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
      adopted: faker.datatype.boolean(),
    });
  }
  res.json(pets);
});

router.get('/mockingusers', (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const role = Math.random() > 0.5 ? 'user' : 'admin';
    users.push(generateMockUser(role));
  }
  res.json(users);
});

// Nuevo endpoint para insertar usuarios y mascotas en la base de datos
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;
  const userDocs = [];
  const petDocs = [];

  for (let i = 0; i < users; i++) {
    const role = Math.random() > 0.5 ? 'user' : 'admin';
    userDocs.push(generateMockUser(role));
  }
  for (let i = 0; i < pets; i++) {
    petDocs.push(generateMockPet());
  }

  const insertedUsers = await User.insertMany(userDocs);
  const insertedPets = await Pet.insertMany(petDocs);

  res.json({
    message: 'Datos generados e insertados',
    users: insertedUsers.length,
    pets: insertedPets.length
  });
});

export default router;