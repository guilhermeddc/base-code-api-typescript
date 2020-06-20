import { Router } from 'express';
import RecipeController from '../../../controllers/RecipeController';

const routes = Router();

routes.get('/', RecipeController.getRecipes);

export default routes;
