const { Router } = require('express');
const ClinicController = require('../controllers/clinic.controller');
const validate = require('../middlewares/validate');
const { ClinicSearchRequestSchema } = require('../schemas/clinic.schema');

class ClinicRoute {
  constructor() {
    this.path = '/clinic';
    this.router = Router();
    this.clinicController = new ClinicController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/search`, validate(ClinicSearchRequestSchema), this.clinicController.search);
  }
}

module.exports = ClinicRoute;
