import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from '../config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Auth API Docs',
      version: config.appVersion,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express) => {
  // Create swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in Json Format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
