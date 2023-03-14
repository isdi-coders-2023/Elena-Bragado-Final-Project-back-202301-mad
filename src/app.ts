import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import createDebug from 'debug';

const debug = createDebug('HOM:app');

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (_req, resp) => {
  resp.json({
    info: 'HomeClick!',
    endpoints: {
      users: '/users',
    },
  });
});
