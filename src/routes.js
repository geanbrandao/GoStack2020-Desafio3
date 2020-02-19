// nesse aquivo é como se fosse meu ApiService
import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

// login
routes.post('/signin', SessionController.store);

// middleware - todo request a partir daqui vai validar o token
routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);

// pega destinatarios cadastrados
routes.get('/recipients', RecipientController.index);

// update destinatario usando o id na query
routes.put('/recipient', RecipientController.update);

// deleta destinatario usando id
routes.delete('/recipient', RecipientController.destroy);

// Admin-deliveryman
routes.post('/deliveryman', DeliverymanController.store);
routes.delete('/deliveryman/:deliveryman_id', DeliverymanController.destroy);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliveryman/:deliveryman_id', DeliverymanController.update);

export default routes;
