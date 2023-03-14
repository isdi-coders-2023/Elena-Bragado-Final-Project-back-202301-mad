import mongoose from 'mongoose';
import { config } from '../config.js';
import createDebug from 'debug';

const debug = createDebug('HOM:DBconnect');

const { user, password, cluster, dbName } = config;

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? dbName + '_Testing' : dbName;
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${finalDBName}?retryWrites=true&w=majority`;
  debug(uri);
  return mongoose.connect(uri);
};
