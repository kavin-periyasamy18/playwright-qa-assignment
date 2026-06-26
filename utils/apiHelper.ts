import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  private get headers() {
    const apiKey = process.env.REQRES_API_KEY;
    if (!apiKey) throw new Error('REQRES_API_KEY is missing');

    return {
      'x-api-key': apiKey,
    };
  }

  createUser(name: string, job: string): Promise<APIResponse> {
    return this.request.post('https://reqres.in/api/users', {
      headers: this.headers,
      data: { name, job },
    });
  }

  getUser(userId: string): Promise<APIResponse> {
    return this.request.get(`https://reqres.in/api/users/${userId}`, {
      headers: this.headers,
    });
  }

  updateUser(userId: string, name: string): Promise<APIResponse> {
    return this.request.put(`https://reqres.in/api/users/${userId}`, {
      headers: this.headers,
      data: { name },
    });
  }
}