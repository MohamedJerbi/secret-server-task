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
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', secretRouter);

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

export const start = async () => {
  try {
    await connect(process.env.CONNECT);
    app.listen(port, host, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};
