import { Router } from 'express';
import recipes from './recipes';

const routes = Router();

routes.use('/recipes', recipes);

export default routes;
