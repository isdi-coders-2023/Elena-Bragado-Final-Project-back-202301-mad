import mongoose from 'mongoose';
import { config } from '../config.js';

const { user, password, cluster, dbName } = config;

export const dbConnect = (env?: string) => {
  const envFinal = env || process.env.NODE_ENV;
  const finalDBName = envFinal === 'test' ? dbName + '_Testing' : dbName;
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${finalDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
