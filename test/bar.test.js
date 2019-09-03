require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('bar routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a bar review', () => {
    return request(app)
      .post('/api/v1/bars')
      .send({
        name: 'Momos',
        address: '725 SW 10th Ave, Portland, OR 97205',
        notes: 'alchemy folks fav place'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Momos',
          address: '725 SW 10th Ave, Portland, OR 97205',
          notes: 'alchemy folks fav place',
          __v: expect.any(Number)
        });
      });
  });
});
