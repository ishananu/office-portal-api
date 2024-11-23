import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '@config/config';
import employeeRouter from '@routes/employee.routes';
import productRouter from '@routes/product.routes';
import { Database } from './src/Database';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import authRouter from '@routes/auth.routes';

const startServer = () => {
  const app: Express = express();
  const port = config.port || 3000;
  const apiVersion = '/api/v1/';

  app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  Database.getInstance();

  app.use('/api/employees', employeeRouter);
  app.use('/api/products', productRouter);
  app.use('/api/auth', authRouter);

  const swaggerDocs = swaggerJsdoc({
    definition: {
      info: {
        title: 'Office Portal API',
        contact: { name: 'Office Portal DEV Team', email: '' },
        description: 'Office Portal API information',
        version: '1.0.0'
      },
      basePath: '/'
    },
    apis: ['./src/routes/*.routes.ts']
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.listen(Number(port), async () => {
    console.log(`🚀  Server ready at ${port}`);
  });
};

startServer();
