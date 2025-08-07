import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(requestContext: APIRequestContext) {
    this.request = requestContext;
  }

  public setAuthToken(token: string): void {
    this.token = token;
  }

  async get(endpoint: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...options?.headers,
      },
    });
  }

  async post<T>(
    endpoint: string,
    data: T,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data,
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...options?.headers,
      },
    });
  }

  async put<T>(
    endpoint: string,
    data: T,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data,
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...options?.headers,
      },
    });
  }

  async delete(endpoint: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...options?.headers,
      },
    });
  }
}
