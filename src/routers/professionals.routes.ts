import { Router as router } from 'express';
import createDebug from 'debug';
import { ProfessionalController } from '../controllers/professional.controller.js';
import { ProfessionalsMongoRepo } from '../repository/professsionals/professionals.mongo.repo.js';

const debug = createDebug('HOME:professionals:routers');

export const professionalsRouter = router();
const repoProfessionals = ProfessionalsMongoRepo.getInstance();
const controllerProfessionals = new ProfessionalController(repoProfessionals);

debug('Professionals router');

professionalsRouter.post(
  '/add',
  controllerProfessionals.addOne.bind(controllerProfessionals)
);
professionalsRouter.get(
  '/',
  controllerProfessionals.getAll.bind(controllerProfessionals)
);
professionalsRouter.get(
  '/:id',
  controllerProfessionals.getById.bind(controllerProfessionals)
);
professionalsRouter.patch(
  '/',
  controllerProfessionals.update.bind(controllerProfessionals)
);
professionalsRouter.delete(
  '/:id',
  controllerProfessionals.delete.bind(controllerProfessionals)
);
