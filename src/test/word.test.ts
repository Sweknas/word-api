import request from 'supertest';
import app from '../app';

describe('Test Word routes', () => {
  it('should be able to get frequency of a word in a text', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'one two three' });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({ topWords: { one: 1, two: 1, three: 1 }, totalWords: 3 });
  });

  it('should get error if text is not provided', async () => {
    const result = await request(app).post('/word/frequency').send({});

    expect(result.status).toBe(400);
    expect(result.body).toStrictEqual({ error: 'Missing text in body of request' });
  });

  it('should get error if text is not a string', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 1 });

    expect(result.status).toBe(400);
    expect(result.body).toStrictEqual({ error: 'Body parameter text should be a string' });
  });

  it('should get error if count is not a number', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'one two three', count: '1' });

    expect(result.status).toBe(400);
    expect(result.body).toStrictEqual({ error: 'Body parameter count should be a number' });
  });

  it('should get error if caseSensitive is not a boolean', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'one two three', caseSensitive: '1' });

    expect(result.status).toBe(400);
    expect(result.body).toStrictEqual({ error: 'Body parameter caseSensitive should be a boolean' });
  });

  it('should be able to only get top 10 words if count is not provided', async () => {
    const result = await request(app).post('/word/frequency').send({ text: '1 2 3 4 5 6 7 8 9 10 11' });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      topWords: { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1 },
      totalWords: 11,
    });
  });

  it('should be able to get top 5 words if count is provided', async () => {
    const result = await request(app).post('/word/frequency').send({ text: '1 2 3 4 5 6 7 8 9 10 11', count: 5 });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      topWords: { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1 },
      totalWords: 11,
    });
  });

  it('should count words case insensitive as default', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'Case case' });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      topWords: { case: 2 },
      totalWords: 1,
    });
  });

  it('should count words case insensitive if caseSensitive is false', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'Case case', caseSensitive: false });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      topWords: { case: 2 },
      totalWords: 1,
    });
  });

  it('should count words case sensitive if caseSensitive is true', async () => {
    const result = await request(app).post('/word/frequency').send({ text: 'Case case', caseSensitive: true });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      topWords: { Case: 1, case: 1 },
      totalWords: 2,
    });
  });
});
