import { Request, Response } from 'express';
import api from '../services/api';
import getGifs from '../utils/getGifs';

interface IGiphy {
  data: {
    data: [
      {
        images: {
          original: {
            url: string;
          };
        };
      },
    ];
  };
}

interface IRecipes {
  title: string;
  href: string;
  ingredients: string;
}

class RecipeController {
  /**
   * Function that returns Recipe Puppy.
   * @query ?i=eggs,flour
   * @return {object}
   *   200 - Success
   * @example
   * Response:
   *
   * {
   *    "title": "Recipe Puppy",
   *    "version": 0.1,
   *    "href": "http://www.recipepuppy.com/",
   *    "results": [
   *        {
   *            "title": "Ginger Champagne",
   *            "href": "http://allrecipes.com/Recipe/Ginger-Champagne/Detail.aspx",
   *            "ingredients": "champagne, ginger, ice, vodka",
   *            "thumbnail": "http://img.recipepuppy.com/1.jpg"
   *        }
   *    ]
   * }
   */

  async getRecipes(request: Request, response: Response) {
    const aux = request.query.i as string;

    const ingredients = aux.split(',').sort();

    if (ingredients.length > 3) {
      return response
        .status(401)
        .json({ message: 'The maximum number of ingredients was three' });
    }

    try {
      const recipes = await api.puppy.get(`/?i=${aux}`);
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
