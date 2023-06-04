import createDebug from 'debug';
import { Response, Request, NextFunction } from 'express';

import { Professional } from '../entities/professional.js';
import { HTTPError } from '../errors/errors.js';
import { RequestPlus } from '../interceptors/logged.js';
import { ProfessionalRepo } from '../repository/professsionals/professionals.repo.interface.js';

const debug = createDebug('HOME:p-controller');

export class ProfessionalController {
  constructor(public repo: ProfessionalRepo<Professional>) {
    this.repo = repo;
    debug('Controller instanced');
  }

  async addOne(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('POST: addOne');
      if (!req.body.email || !req.body.company)
        throw new HTTPError(
          406,
          'Not acceptable',
          'Invalid properties required'
        );
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GETAll-professionals');
      const data = await this.repo.query();
      if (!data)
        throw new HTTPError(404, 'Not found', 'Proffesional not found');
      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GetById');
      const getId = await this.repo.queryId(req.params.id);
      if (!getId)
        throw new HTTPError(404, 'Not found', 'Proffesional not found');
      resp.status(201);
      resp.json({
        results: getId,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Patch-update');
      if (!req.body.id)
        throw new HTTPError(
          406,
          'Not acceptable',
          'Invalid properties required'
        );
      const data = await this.repo.update(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete-professional');
      if (!req.params.id)
        throw new HTTPError(
          406,
          'Not acceptable',
          'Invalid properties required'
        );
      await this.repo.delete(req.params.id);
      resp.status(201);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
