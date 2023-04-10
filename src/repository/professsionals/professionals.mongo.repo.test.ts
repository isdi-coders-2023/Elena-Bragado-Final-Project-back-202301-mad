import { ProfessionalModel } from './professional.mongo.model';
import { ProfessionalsMongoRepo } from './professionals.mongo.repo';
import { Professional } from '../../entities/professional.js';
import { ProfessionalRepo } from './professionals.repo.interface';
import { HTTPError } from '../../errors/errors';

jest.mock('./professional.mongo.model');

describe('Given the professionals repository', () => {
  let repo: ProfessionalRepo<Professional>;

  beforeEach(() => {
    repo = ProfessionalsMongoRepo.getInstance();
  });

  describe('When we instantiate the repo', () => {
    test('Then it should not be ok', () => {
      expect(repo).toBeInstanceOf(ProfessionalsMongoRepo);
    });
  });

  describe(`When we use the create method`, () => {
    test('Then it should return a new pet', async () => {
      (ProfessionalModel.create as jest.Mock).mockResolvedValue({
        company: 'jack,SL',
      });
      const newProfessional = {
        company: 'jack,SL',
      };
      const result = await repo.create(newProfessional);
      expect(result).toEqual(newProfessional);
    });
  });

  describe('When we use the query method', () => {
    test('Then it should return all de professionals', async () => {
      (ProfessionalModel.find as jest.Mock).mockResolvedValue([]);
      await repo.query();
      expect(ProfessionalModel.find).toHaveBeenCalled();
    });
  });

  describe('When we use the queryId method', () => {
    test('Then it should return a professional by id', async () => {
      (ProfessionalModel.findById as jest.Mock).mockResolvedValue([]);
      await repo.queryId('id');
      expect(ProfessionalModel.findById).toHaveBeenCalled();
    });

    test('Then it should throw an error if it does not find the id', async () => {
      (ProfessionalModel.findById as jest.Mock).mockImplementation();
      expect(async () => repo.queryId('1')).rejects.toThrow();
    });
  });

  describe(`When we use update method`, () => {
    test('Then it should return an updated professional', async () => {
      (ProfessionalModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([]);
      await repo.update({} as Professional);
      expect(ProfessionalModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    test('Then it should throw an error if the id does not exist', async () => {
      (ProfessionalModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        undefined
      );
      const result = repo.update({});
      await expect(result).rejects.toThrow();
    });
  });

  describe(`When we use the delete method`, () => {
    test('Then it should delete a company', async () => {
      (ProfessionalModel.findByIdAndDelete as jest.Mock).mockResolvedValue([]);
      await repo.delete('id');
      expect(ProfessionalModel.findByIdAndDelete).toHaveBeenCalled();
    });

    test('Then it should throw an error if the id does not exist', async () => {
      (ProfessionalModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        undefined
      );
      const result = repo.delete('1');
      await expect(result).rejects.toThrow();
    });
  });
});
