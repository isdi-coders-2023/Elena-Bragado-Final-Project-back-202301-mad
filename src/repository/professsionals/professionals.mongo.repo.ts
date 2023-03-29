import { ProfessionalRepo } from './professionals.repo.interface.js';
import createDebug from 'debug';
import { ProfessionalModel } from './professional.mongo.model.js';
import { Professional } from '../../entities/professional.js';
import { HTTPError } from '../../errors/errors.js';

const debug = createDebug('HOME:p-repo');

export class ProfessionalsMongoRepo implements ProfessionalRepo<Professional> {
  private static instance: ProfessionalsMongoRepo;

  public static getInstance(): ProfessionalsMongoRepo {
    if (!ProfessionalsMongoRepo.instance)
      ProfessionalsMongoRepo.instance = new ProfessionalsMongoRepo();
    return ProfessionalsMongoRepo.instance;
  }

  public constructor() {
    debug('Instantiate professional');
  }

  async create(info: Partial<Professional>): Promise<Professional> {
    debug('create');
    const data = await ProfessionalModel.create(info);
    return data;
  }

  async query(): Promise<Professional[]> {
    debug('query-getall');
    const data = await ProfessionalModel.find();
    if (!data) throw new HTTPError(404, 'Not found', 'Professionals not found');
    return data;
  }

  async queryId(id: string): Promise<Professional> {
    debug('queryId');
    const getId = await ProfessionalModel.findById(id);
    if (!getId) throw new HTTPError(404, 'Not found', 'Id not found');
    return getId;
  }

  async update(info: Partial<Professional>): Promise<Professional> {
    debug('Instantiated at constructor at update method');
    const data = await ProfessionalModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug(id);
    const data = await ProfessionalModel.findByIdAndDelete(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found');
  }
}
