import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
require('dotenv').config();

import connect from '../connect';
import secretRouter from './routes/secret.route';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json({ limit: '15mb' }));
app.use(urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

app.use('/', secretRouter);

export const start = async () => {
  try {
    await connect(process.env.CONNECT);
    app.listen(process.env.port, () => {
      console.log(`REST API on http://localhost:${process.env.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
