import { faker } from '@faker-js/faker';

export function getRandomUserId() {
  return faker.number.int({ min: 1, max: 30 });
}