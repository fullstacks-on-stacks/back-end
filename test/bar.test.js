require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Bar = require('../lib/models/Bar');

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

  it('can get all the bars', async() => {
    const bar = await Bar.create([
      {
        name: 'Bettys',
        address: '435 W Nationwide Blvd, Columbus, OH 43215',
        notes: '$3 Betty Ford Clinic Special drink'
      },
      {
        name: 'Aalto Lounge',
        address: '3356 SE Belmont St, Portland, OR 97214',
        notes: '$3 drinks from 5-7pm'
      }
    ]);

    return request(app)
      .get('/api/v1/bars')
      .then(res => {
        const barsJSON = JSON.parse(JSON.stringify(bar));
        barsJSON.forEach(bar => {
          expect(res.body).toContainEqual({
            name: bar.name,
            address: bar.address,
            notes: bar.notes,
            _id: bar._id
          });
        });
      });
  });
});
