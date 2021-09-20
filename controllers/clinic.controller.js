/* eslint-disable class-methods-use-this */
const { logger } = require('../configs/logger');
const { apiResponse } = require('../utils/apiResponseFormatter');
const { convertQueryParamsToLowerCase } = require('../utils/queryParamsFormatter');
const { fetchDentalClinicApi, fetchVetsClinicApi } = require('../services/clinic.service');

// Assumption 1: multiple search conditions are considered as OR.
// Assumption 2: response can contain duplicate results.
class ClinicController {
  /**
   * Search Clinic API controller
   * @param  {object} req
   * @param  {object} res
   * @returns {object}
   */
  async search(req, res) {
    try {
      // converts values of query params to lowercase to make search case insensitive.
      const queryPayload = convertQueryParamsToLowerCase(req.query);
      // processes dental clinic and vets clinic data in parallel.
      const [dentalClinicList, vetsClinicList] = await Promise.all([fetchDentalClinicApi(queryPayload), fetchVetsClinicApi(queryPayload)]);
      const result = dentalClinicList.concat(vetsClinicList);
      res.send(apiResponse(200, 'Ok', result, null)).status(200);
    } catch (error) {
      logger.error(error);
      res.status(500).send(apiResponse(500, 'Internal Server Error', null, error.message));
    }
  }
}

module.exports = ClinicController;
