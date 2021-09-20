# Clinic-Search-ScratchPay [![Build Status](https://app.travis-ci.com/vikashcool1991/Clinic-Search-ScratchPay.svg?branch=main)](https://app.travis-ci.com/github/vikashcool1991/Clinic-Search-ScratchPay)
Clinic Search Application - SratchPay coding challenge

This Project contains clinic search api + documentation + tests + travis CI + Dockerisation.

## Assumptions
- multiple search conditions are considered as OR.
- response can contain duplicate results.

## Available Valid routes
- [GET] http://localhost:3000/api/v1/api-docs
- [GET] http://localhost:3000/api/v1/clinic/search?clinicName=value1&state=value2&from=00:00&to=12:00

## Data Sources
- https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json
- https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json

## Quick Start

#### Install Dependencies

```bash
npm install
```

#### Run in Dev mode

```bash
npm run dev
```

#### Run in Prod mode

```bash
npm run start
```

#### Run lint

```bash
npm run lint
```

#### Run test

```bash
npm run test
```

#### Run coverage

```bash
npm run coverage
```

#### Docker build command

```bash
docker build -t ${tag} .
```

#### Docker run command

```bash
docker run -d -p ${port}:${port} --name ${name} ${tag}
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `schemas` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const { Router } = require('express');
const ClinicController = require('../controllers/clinic.controller');
const validate = require('../middlewares/validate');
const { ClinicSearchRequestSchema } = require('../schemas/clinic.schema');

const router = Router();

router.get('/api/v1/clinic/search', validate(ClinicSearchRequestSchema), clinicController.search);
```

## Logging

Import the logger from `configs/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/configs/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).


## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.



## License

[MIT](LICENSE)