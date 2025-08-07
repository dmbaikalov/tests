import { test, expect } from '../../fixtures/api.fixture';
import { getProductData } from '../../utils/products.generator';

test.describe('Products API', () => {
  let createdProductId: number;

  test.beforeAll(async ({ usersAPI, productsAPI  }) => {
    const token = await usersAPI.loginAndGetToken();
    productsAPI.apiClient.setAuthToken(token);
  });

  test('User is able to create, update, delete a products', async ({ productsAPI }) => {
    
    const productData = getProductData()
    const createResponse = await productsAPI.createProduct(productData);
    expect(createResponse.ok());
    const createdBody = await createResponse.json();
    createdProductId = createdBody.id;
    expect(createdProductId).toBeGreaterThan(0);

    
    const updateResponse = await productsAPI.updateProduct(50, { price: 200 });
    expect(updateResponse.ok());
    const updatedBody = await updateResponse.json();
    expect(updatedBody.price).toBe(200);

   
    const deleteResponse = await productsAPI.deleteProduct(50);
    expect(deleteResponse.ok());
    const deletedBody = await deleteResponse.json();
    expect(deletedBody.isDeleted).toBe(true);
  });

  test('should search for products by keyword', async ({ productsAPI }) => {
    const keyword = 'calvin klein';
    const response = await productsAPI.searchProducts(keyword);
    expect(response.ok()).toBeTruthy();
    
    const { products } = await response.json();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].title.toLowerCase()).toContain(keyword);
  });
});