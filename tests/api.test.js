const express = require('express');
const request = require('supertest');

// Mocker la base de données pour le test
jest.mock('../db', () => ({
  query: jest.fn()
}));
const pool = require('../db');
const routes = require('../routes/appartements');

const app = express();
app.use(express.json());
app.use('/api/appartements', routes);

describe('Appartements API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/appartements - Liste les appartements', async () => {
    const mockData = [{ numpapp: 1, design: 'Test', loyer: 1500 }];
    pool.query.mockResolvedValue([mockData]);
    
    const res = await request(app).get('/api/appartements');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  it('POST /api/appartements - Ajoute un appartement', async () => {
    pool.query.mockResolvedValue([{ insertId: 2 }]);
    
    const res = await request(app)
      .post('/api/appartements')
      .send({ design: 'Nouveau', loyer: 2000 });
      
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ numpapp: 2, design: 'Nouveau', loyer: 2000 });
  });
});
