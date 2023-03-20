import { User } from '../entities/user.js';
import { Repo } from './users.repo.interface.js';
import { UserModel } from './user.mongo.model.js';
import createDebug from 'debug';

const debug = createDebug('HOME:repo:users');

export class UsersMongoRepo implements Partial<Repo<User>> {
  private static instance: UsersMongoRepo;

  public static getInstance(): UsersMongoRepo {
    if (!UsersMongoRepo.instance)
      UsersMongoRepo.instance = new UsersMongoRepo();
    return UsersMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiated at constructor');
  }

  async create(info: Partial<User>): Promise<User> {
    debug('Instantiated at constructor at create method');
    const data = await UserModel.create(info);
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('Instantiated at constructor at search method');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }
}
