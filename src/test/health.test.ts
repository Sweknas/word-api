import request from 'supertest';
import app from '../app';

describe('Health routes', () => {
  it('Should be able to get health', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({ status: 'ok', message: 'Service is healthy' });
  });
});
