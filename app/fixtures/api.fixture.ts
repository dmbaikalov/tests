import { test as base } from '@playwright/test';
import { ApiClient } from '../api/api.client';
import { ProductsAPI } from '../api/api.products';
import { UsersAPI } from '../api/api.users';

type ApiFixture = {
  productsAPI: ProductsAPI;
  usersAPI: UsersAPI;
};

export const test = base.extend<ApiFixture>({
  usersAPI: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(new UsersAPI(apiClient));
  },
  productsAPI: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(new ProductsAPI(apiClient));
  },
});

export { expect } from '@playwright/test';