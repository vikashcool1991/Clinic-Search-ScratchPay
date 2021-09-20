const request = require('supertest');
const App = require('../app');
const ClinicRoute = require('../routes/clinic.route');

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Clinic API routes', () => {
  describe('[GET] /api/v1/clinic/search', () => {
    it('response statusCode 200', async () => {
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test`).expect(200);
    });

    it('response statusCode 200 with from/to params', async () => {
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test&from=00:00&to=12:00`).expect(200);
    });

    it('response statusCode 500 with no params', async () => {
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search`).expect(500);
    });

    it('response statusCode 500 with missing one of from/to params', async () => {
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test&from=09:00`).expect(500);
    });
  });
});
