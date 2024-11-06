import { expect } from '@playwright/test';

export class API {
  constructor(request) {
    this.request = request;
    this.token = undefined;
  }

  async setToken() {
    const response = await this.request.post('http://localhost:3333/sessions', {
      data: {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = JSON.parse(await response.text());
    this.token = body.token;
  }

  async postMovie(movie) {
    await this.setToken();
    const response = await this.request.post('http://localhost:3333/movies', {
      headers: {
        Authorization: 'Bearer ' + this.token,
        ContentType: 'multipart/form-data',
        Accept: 'application/json, text/plain, */*'
      },
      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: 'c7511e54-d9fc-41e5-81fa-c055fce757dc',
        release_year: movie.release_year,
        featured: movie.featured
      }
    });
    expect(response.ok()).toBeTruthy();
  }

}