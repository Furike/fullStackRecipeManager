import { GetRecipeInput } from 'backend/src/modules/recipe/schema';

export default async function deleteRecipe(id: GetRecipeInput['id']) {
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    // this is here to trigger useMutation's onError, couldn't find a better way
    throw new Error();
  }
}
