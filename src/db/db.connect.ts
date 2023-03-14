import mongoose from 'mongoose';
import { config } from '../config.js';

const { user, password, cluster, dbName } = config;

export const dbConnect = (env?: string) => {
  const envFile = env || process.env.NODE_ENV;
  const fileDBName = envFile === 'test' ? dbName + '_Testing' : dbName;
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${fileDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
