import api from '../src/services/api';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';
import app from '../src/app';

const mockPuppy = new MockAdapter(api.puppy);
const mockGiphy = new MockAdapter(api.giphy);

describe('Recipes', () => {
  afterEach(() => {
    mockPuppy.reset();
    mockGiphy.reset();
  });

  it('Should return success with invalid params', async () => {
    mockPuppy.onGet('/').reply(200, {});
    mockGiphy
      .onGet(`/search?q=Marmite&api_key=${process.env.API_GIPHY_KEY}&limit=1`)
      .reply(200, {});

    const response = await request(app).get('/api/v1/recipes?i=eggs');

    expect(response.text).toEqual(
      JSON.stringify({
        message: 'Recipepuppy api is down',
      }),
    );
  });

  it('Should return success with max number of ingredients in query', async () => {
    mockPuppy.onGet('/').reply(200, {});

    const response = await request(app).get(
      '/api/v1/recipes?i=eggs,bread,flour,sugar',
    );

    expect(response.text).toEqual(
      JSON.stringify({
        message: 'The maximum number of ingredients was three',
      }),
    );
  });

  it('Should return success with zero number of ingredients in query', async () => {
    mockPuppy.onGet('/').reply(200, {});

    const response = await request(app).get('/api/v1/recipes');

    expect(response.text).toEqual(
      JSON.stringify({
        message: 'Put an ingredient in the menus',
      }),
    );
  });
});
