import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors';
import { RequestPlus } from '../interceptors/logged';
import { ProfessionalsMongoRepo } from '../repository/professsionals/professionals.mongo.repo';
import { ProfessionalController } from './professional.controller';

describe('Given Professional controller', () => {
  const repo: ProfessionalsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    body: {
      email: 'sample@sample.com',
      company: 'samper,SL',
      category: 1,
    },
    params: { id: '23' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  const controller = new ProfessionalController(repo);

  describe('When the method addOne is called', () => {
    const req = {
      body: {
        email: 'sample@sample.com',
        company: 'samper,SL',
        category: 1,
      },
      params: { id: '23' },
    } as unknown as Request;
    const resp = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    test('Then if it should be no errors', async () => {
      await controller.addOne(req, resp, next);

      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalledWith({ results: [undefined] });
    });

    test('Then it should be not ok', async () => {
      const req = {
        body: { email: 'sample@sample.com', company: 'test' },
        params: { id: '23' },
      } as unknown as RequestPlus;
      const error = new HTTPError(
        406,
        'Not acceptable',
        'Invalid properties required'
      );
      await controller.addOne(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When getAll method is called', () => {
    test('Then, it should return the data if there isnt any problem', async () => {
      (repo.query as jest.Mock).mockResolvedValueOnce('Test');
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalledWith({ results: 'Test' });
    });
    test('Then, if there is any error it should call next', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
    test('Then, it should call next with Not found if there is no data from repo', async () => {
      (repo.query as jest.Mock).mockResolvedValueOnce(undefined);
      const error = new HTTPError(404, 'Not found', 'Proffesional not found');
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When getById method is called', () => {
    test('Then it should call the repo method', async () => {
      await controller.getById(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('Then, if there is any error it should call next', async () => {
      (repo.queryId as jest.Mock).mockResolvedValue(new Error());
      await controller.getById(req, resp, next);
      expect(repo.queryId);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Given the update method', () => {
    const req = {
      body: { id: '1' },
    } as unknown as Request;
    test('Then, if everything it is Ok it should call the repo method', async () => {
      await controller.update(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('Then, if there is any error it should call next', async () => {
      const req = {
        body: {
          id: undefined,
        },
      } as unknown as Request;
      (repo.update as jest.Mock).mockResolvedValue(new Error());
      await controller.update(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
  });
  describe('When delete method is called', () => {
    test('Then, it should work if there is no errors', async () => {
      const req = {
        params: {
          id: '1',
        },
      } as unknown as Request;

      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('Then, if there is any error it should call next function', async () => {
      const req = {
        params: {
          id: undefined,
        },
      } as unknown as Request;

      await controller.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
