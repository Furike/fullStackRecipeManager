import {
  CreateRecipeInput,
  RecipeResponse,
} from 'backend/src/modules/recipe/schema';

export default async function createRecipe(recipe: CreateRecipeInput) {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...recipe }),
  });
  if (!response.ok) {
    // this is here to trigger useMutation's onError, couldn't find a better way
    throw new Error();
  }
  const newRecipe: RecipeResponse = await response.json();
  return newRecipe;
}
