import { Router as router } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users.mongo.repo';
import { UserController } from '../controllers/user.controller';

const debug = createDebug('HOME:users:routers');

export const usersRouter = router();
const repoUsers = UsersMongoRepo.getInstance();
const controllerUsers = new UserController(repoUsers);

debug('Users router');

usersRouter.post('/register', controllerUsers.register.bind(controllerUsers));
usersRouter.post('/login', controllerUsers.login.bind(controllerUsers));
