import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '@config/config';

const startServer = () => {
  const app: Express = express();
  const port = config.port || 3000;
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.listen(port, async () => {
    console.log(`🚀  Server ready at ${port}`);
  });
};

startServer();
