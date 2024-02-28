import {
  GetRecipeInput,
  RecipeResponse,
} from 'backend/src/modules/recipe/schema';

export default async function getRecipe(id: GetRecipeInput['id']) {
  const url = `/api/recipes/${id}`;
  const response = await fetch(url);
  const recipe: RecipeResponse = await response.json();
  return recipe;
}
