const dotEnv = require('dotenv');
const path = require('path');
const envVarsSchema = require('../schemas/envVarsSchema');
const { DEFAULT_ENV, DEFAULT_PORT } = require('../utils/constants');

dotEnv.config({
  path: path.join(__dirname, '../.env'),
});

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV || DEFAULT_ENV,
  port: envVars.PORT || DEFAULT_PORT,
  cors: {
    origin: true,
    credentials: true,
  },
  log: {
    format: 'dev',
    dir: '../logs',
  },
};
