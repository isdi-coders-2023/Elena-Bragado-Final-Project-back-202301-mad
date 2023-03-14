import mongoose from 'mongoose';
import { config } from '../config.js';
import { dbConnect } from './db.connect.js';

jest.mock('mongoose');

describe('Given the dbConnect function', () => {
  describe('When it is called is not test enviroments ', () => {
    test('Then it should call the mongoose.connect and connect with uri', async () => {
      const { user, password, cluster, dbName } = config;
      const uri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
      await dbConnect('env');
      expect(mongoose.connect).toHaveBeenCalledWith(uri);
      mongoose.disconnect();
    });
  });
});
