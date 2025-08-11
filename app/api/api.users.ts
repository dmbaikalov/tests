import {  APIResponse, expect } from '@playwright/test';
import { getRandomUserId } from '../utils/user.id.generator';
import { ApiClient } from './api.client';

interface LoginCredentials {
  username: string;
  password: string;
};

export class UsersAPI {

  constructor(private apiClient: ApiClient) {}

    async loginAndGetToken(): Promise<string> {
    //Get a random user's data
    const userId = getRandomUserId();
    const userResponse = await this.apiClient.get(`users/${userId}`);
    expect(userResponse.ok());
    const { username, password } = await userResponse.json();

    //Log in with the user's credentials
    const loginResponse = await this.apiClient.post('auth/login', { username, password_val: password });
    expect(loginResponse.ok());
    const { token } = await loginResponse.json();

    //Set the token on the ApiClient for future requests
    this.apiClient.setAuthToken(token);

    return token;
  }

  async getAuthToken(): Promise<void> {
    //Get a random user's data by calling the API directly
    const userId = getRandomUserId();
    const userResponse = await this.apiClient.get(`users/${userId}`);
    expect(userResponse.ok(), `Failed to get user with ID ${userId}`).toBeTruthy();
    const { username, password } = await userResponse.json();

    //Log in with the user's credentials
    const credentials: LoginCredentials = { username, password: password };
    const loginResponse = await this.login(credentials.username, credentials.password);
    expect(loginResponse.ok(), 'Failed to log in').toBeTruthy();
    const { token } = await loginResponse.json();

    return token;
  }

  async login(username: string, password: string): Promise<APIResponse> {
    return this.apiClient.post('auth/login', {
      data: { username, password },
    });
  }

  async getUserById(id: number): Promise<APIResponse> {
    return this.apiClient.get(`users/${id}`);
  }

  async getAllUsers(): Promise<APIResponse> {
    return this.apiClient.get('users');
  }

}