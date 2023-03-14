import { middlewares } from './middlewares';
import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
import { HTTPError } from '../errors/errors';

describe('Given middlewares', () => {
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const req = {} as unknown as Request;

  describe('When the error is a mongoose Cast Error', () => {
    test('Then status should be 400', () => {
      const error = new MongooseError.CastError('', '', '');
      middlewares(error, req, resp);
      expect(resp.status).toHaveBeenLastCalledWith(400);
    });
  });

  describe('When the error is a mongoose Validation Error', () => {
    test('Then status should be 406', () => {
      const error = new MongooseError.ValidationError();
      middlewares(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(406);
    });
  });

  describe('When the error is a custom HTTPError', () => {
    test('Then it HTTPError status', () => {
      const error = new HTTPError(418, 'Tea', 'Pot');
      middlewares(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(418);
    });
  });

  describe('When the error is any other Error', () => {
    test('Then it should', () => {
      const error = new Error('Tea Pot');
      middlewares(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(500);
    });
  });
});
