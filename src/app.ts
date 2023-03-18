import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import createDebug from 'debug';
import { usersRouter } from './routers/users.routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = createDebug('HOME:app');

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.static('public'));

app.use('/users', usersRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: 'HomeClick!',
    endpoints: {
      users: '/users',
    },
  });
});
