const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./configs/config');
const { logger, stream } = require('./configs/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');

class App {
  constructor(routes) {
    this.app = express();
    this.port = config.port;
    this.env = config.env;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  getServer() {
    return this.app;
  }

  initializeMiddlewares() {
    this.app.use(
      morgan(config.log.format, {
        stream,
      }),
    );
    this.app.use(
      cors({
        origin: config.cors.origin,
        credentials: config.cors.credentials,
      }),
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    this.app.use(cookieParser());
  }

  initializeRoutes(routes) {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Clinic Search API Documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

module.exports = App;
