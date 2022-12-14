import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import config from './config';
import 'reflect-metadata';

const createApp = () => {
  const app = express();
  const port = config.apiPort;
  const whiteList = ['http://localhost:*'];
  const corsOptions: CorsOptions = {
    origin: (origin: any, callback: CallableFunction) => {
      if (!whiteList) {
        throw new Error('White list empty');
      }
      if (whiteList.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not found'));
      }
    },
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send(`It's works ${req}`);
  });

  app.listen(port);
};

export default createApp;
