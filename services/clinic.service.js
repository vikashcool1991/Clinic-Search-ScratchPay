const axios = require('axios').default;
const stateCodeToName = require('../utils/stateCodesToName.json');
const stateNameToCodes = require('../utils/stateNameToCodes.json');
const { DENTAL_CLINIC_URL, VETS_CLINIC_URL } = require('../utils/constants');
const { logger } = require('../configs/logger');

module.exports = {
  /**
   * Fetches data from dental clinic API
   * and filters the data for the given query
   * @param  {string} clinicName
   * @param  {string} state
   * @param  {string} from
   * @param  {string} to
   * @returns {Promise} Promise object represents array of filtered objects
   */
  async fetchDentalClinicApi({ clinicName, state, from, to }) {
    try {
      const response = await axios.get(DENTAL_CLINIC_URL);
      let dentalClinicData = response.data || [];
      dentalClinicData = dentalClinicData.filter(({ name, stateName, availability }) => {
        const stateNameSmallCase = stateName.toLowerCase();
        return (
          name.toLowerCase() === clinicName ||
          stateNameSmallCase === stateCodeToName[state] ||
          stateNameSmallCase === stateNameToCodes[state] ||
          stateNameSmallCase === state ||
          (availability.from === from && availability.to === to)
        );
      });
      return dentalClinicData;
    } catch (e) {
      logger.error(e.stack);
      throw new Error(e.message);
    }
  },

  /**
   * Fetches data from vets clinic API
   * and filters the data for the given query
   * @param  {string} clinicName
   * @param  {string} state
   * @param  {string} from
   * @param  {string} to
   * @returns {Promise} Promise object represents array of filtered objects
   */
  async fetchVetsClinicApi({ clinicName, state, from, to }) {
    try {
      const response = await axios.get(VETS_CLINIC_URL);
      let vetsClinicData = response.data || [];
      vetsClinicData = vetsClinicData.filter(({ clinicName: name, stateCode, opening }) => {
        const stateCodeSmallCase = stateCode.toLowerCase();
        return (
          name.toLowerCase() === clinicName ||
          stateCodeSmallCase === stateCodeToName[state] ||
          stateCodeSmallCase === stateNameToCodes[state] ||
          stateCodeSmallCase === state ||
          (opening.from === from && opening.to === to)
        );
      });
      return vetsClinicData;
    } catch (e) {
      logger.error(e.stack);
      throw new Error(e.message);
    }
  },
};
