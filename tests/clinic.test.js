const request = require('supertest');
const axios = require('axios').default;
const App = require('../app');
const ClinicRoute = require('../routes/clinic.route');
const mockClinicData = require('./__mock__/clinicData.json');

jest.mock('axios');

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Clinic API routes', () => {
  describe('[GET] /api/v1/clinic/search', () => {
    jest.setTimeout(5000);
    it('response statusCode 200', async () => {
      axios.get.mockResolvedValue(mockClinicData);
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test`).expect(200);
    });

    it('response statusCode 200 with from/to params', async () => {
      axios.get.mockResolvedValue(mockClinicData);
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test&from=00:00&to=12:00`).expect(200);
    });

    it('response statusCode 500 with no params', async () => {
      axios.get.mockResolvedValue(mockClinicData);
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search`).expect(500);
    });

    it('response statusCode 500 with missing one of from/to params', async () => {
      axios.get.mockResolvedValue(mockClinicData);
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test&from=09:00`).expect(500);
    });

    it('response statusCode 500 when axios fails', async () => {
      axios.get.mockRejectedValue(new Error('test error'));
      const clinicRoute = new ClinicRoute();
      const app = new App([clinicRoute]);

      return request(app.getServer()).get(`/api/v1/clinic/search?clinicName=test`).expect(500);
    });
  });
});
