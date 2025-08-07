import { faker } from '@faker-js/faker';

export function getProductData() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 1, max: 80})),
  };
}