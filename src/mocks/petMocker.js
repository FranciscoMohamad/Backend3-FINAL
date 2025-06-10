import { faker } from '@faker-js/faker';

export function generateMockPet() {
  return {
    name: faker.animal.dog(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean(),
  };
}