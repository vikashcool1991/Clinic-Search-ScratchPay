/* eslint-disable class-methods-use-this */
const { logger } = require('../configs/logger');

class ClinicController {
  async search(req, res) {
    try {
      res.send(req.query).status(200);
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = ClinicController;
