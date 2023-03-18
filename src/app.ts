import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import createDebug from 'debug';
import { usersRouter } from './routers/users.routes.js';
import { CustomError } from './errors/errors.js';

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

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Errors middleware');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({ error: [{ status, statusMessage }] });
    debug(status, statusMessage, error.message);
  }
);
