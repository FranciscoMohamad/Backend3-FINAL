import { faker } from '@faker-js/faker';
import { hashPassword } from '../utils/password-utils.js';

export function generateMockUser(role = 'user') {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: hashPassword('coder123'),
    cart: null,
    role,
    pets: []
  };
}