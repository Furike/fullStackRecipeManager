import { GetRecipesResponse } from 'backend/src/modules/recipe/schema';

export default async function getRecipes(title?: string) {
  const url = title ? `/api/recipes?title=${title}` : '/api/recipes';
  const response = await fetch(url);
  const recipes: GetRecipesResponse = await response.json();
  return recipes;
}
