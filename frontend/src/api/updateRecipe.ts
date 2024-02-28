import {
  CreateRecipeInput,
  GetRecipeInput,
} from 'backend/src/modules/recipe/schema';

export default async function updateRecipe(input: {
  id: GetRecipeInput['id'];
  recipe: CreateRecipeInput;
}) {
  const { id, recipe } = input;
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...recipe }),
  });
  if (!response.ok) {
    // this is here to trigger useMutation's onError, couldn't find a better way
    throw new Error();
  }
}
