import { Request, Response } from 'express';
import api from '../services/api';
import getGifs from '../utils/getGifs';

interface IRecipes {
  title: string;
  href: string;
  ingredients: string;
}

class RecipeController {
  /**
   * Function that returns recipes.
   * @query ?i=eggs,flour
   * @return {object}
   *   200 - Success
   * @example
   * Response:
   *
   * {
   *    "keywords": [ "eggs", "flour" ],
   *    "recipes": [
   *        {
   *            "title": "Ginger Champagne",
   *            "ingredients": ["eggs", "flour", "ice", "vodka"],
   *            "link": "http://www.kraftfoods.com/kf/recipes/savory-deviled-eggs-55779.aspx",
   *            "gif": "https://media0.giphy.com/media/qJkRbWM1MfVjq/giphy.gif?cid=e3ed6ff46c8476f72c0833dd3f1e1686610c4261da789bd9&rid=giphy.gif"
   *        }
   *    ]
   * }
   */

  async getRecipes(request: Request, response: Response) {
    const i = request.query.i as string;

    if (i === undefined) {
      return response
        .status(401)
        .json({ message: 'Put an ingredient in the menus' });
    }

    let ingredients = [];

    if (i.includes(',')) {
      ingredients = i.split(',').sort();
    } else {
      ingredients.push(i);
    }

    if (ingredients.length > 3) {
      return response
        .status(401)
        .json({ message: 'The maximum number of ingredients was three' });
    }

    try {
      const recipes = await api.puppy.get(`/?i=${i}`);
      const recipesSerializedPromise = Promise.all(
        recipes.data.results.map(async (recipe: IRecipes) => {
          const data = {
            title: recipe.title,
            ingredients: recipe.ingredients.split(', ').sort(),
            link: recipe.href,
            gif: await getGifs(recipe.title),
          };

          return data;
        }),
      );

      const recipesSerialized = await recipesSerializedPromise;

      return response
        .status(200)
        .json({ keywords: ingredients, recipes: recipesSerialized });
    } catch (error) {
      return response.status(500).json({ message: 'Recipepuppy api is down' });
    }
  }
}

export default new RecipeController();
