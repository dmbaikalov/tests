import { APIResponse } from '@playwright/test';
import { ApiClient } from './api.client';

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
}

export class ProductsAPI {
  constructor(public apiClient: ApiClient) {}

  async createProduct(productData: Product): Promise<APIResponse> {
    return this.apiClient.post('products/add', productData);
  }

  async updateProduct(productId: number, productData: Partial<Product>): Promise<APIResponse> {
    return this.apiClient.put(`products/${productId}`, productData);
  }

  async deleteProduct(productId: number): Promise<APIResponse> {
    return this.apiClient.delete(`products/${productId}`);
  }

  async searchProducts(keyword: string): Promise<APIResponse> {
    return this.apiClient.get(`products/search?q=${keyword}`);
  }
}
