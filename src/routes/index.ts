import { Router } from 'express';
import routesApi from './api/v1';

const routes = Router();

routes.use('/api/v1', routesApi);

export default routes;
