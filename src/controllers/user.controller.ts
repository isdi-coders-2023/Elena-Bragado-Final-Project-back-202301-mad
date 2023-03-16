import { Response, Request, NextFunction } from 'express';
import { User } from '../entities/user.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from '../repository/users.repo.interface.js';
import createDebug from 'debug';
import { Auth, PayloadToken } from '../services/auth.js';

const debug = createDebug('HOME:controller');

export class UserController {
  constructor(public repo: Repo<User>) {
    this.repo = repo;
    debug('Controller instanced');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: register');

      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid user or password');

      req.body.password = await Auth.hash(req.body.password);

      const data = await this.repo.create(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: login');

      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'PAssword not match');

      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
      };
      const token = Auth.createJWT(payload);

      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
