import { Router } from 'express';
import RecipeController from '../../../app/controllers/RecipeController';

const routes = Router();

routes.get('/', RecipeController.getRecipes);

export default routes;
