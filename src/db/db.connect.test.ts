import mongoose from 'mongoose';
import { dbConnect } from './db.connect';

jest.mock('mongoose');

describe('Given a dbconnect function', () => {
  dbConnect();

  describe('When its called', () => {
    test('Then it should call the mongoose.connect method', () => {
      expect(mongoose.connect).toHaveBeenCalled();
    });
  });
});
