const server = require('../index'); // lanza servidor
const supertest = require('supertest');
const mongoose = require('../utils/dbMongo') // lanza la bbdd
const request = supertest(server)

afterAll( async () => {
  //await server.close()
  await mongoose.connection.close()
})

it('Probando jest', () => {
    expect(1).toBe(1)
})
describe('GET created films', () => {
  it('gets the test endpoint /admin',  async() => {
      await request
          .get('/admin')
          .expect(200)
  })
})

