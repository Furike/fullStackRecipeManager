import { Container, Typography } from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import updateRecipeMutation from '../api/updateRecipe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import getRecipe from '../api/getRecipe';
import RecipeForm from '../components/RecipeForm';

function CreateRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const recipeId = parseInt(id || '');

  const { isPending, error, data } = useQuery({
    queryKey: ['recipe', { id }],
    queryFn: () => getRecipe(recipeId),
    enabled: Boolean(recipeId),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateRecipeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['recipes', 'recipe', { recipeId }],
      });
      navigate(`/recipes/${recipeId}`);
    },
    onError: (e) => console.log(e),
  });

  const updateRecipe = (recipe: CreateRecipeInput) => {
    const input = {
      id: recipeId,
      recipe,
    };
    mutation.mutate(input);
  };

  if (isPending) {
    return;
  }

  if (error || !data) {
    return;
  }
  const { title, instructions, ingredients } = data;
  const recipe: CreateRecipeInput = {
    title,
    instructions,
    ingredients: ingredients.map(({ name, quantity, unit }) => ({
      name,
      quantity,
      unit,
    })),
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mb: 3, color: 'primary.main' }}>
        Edit recipe
      </Typography>
      <RecipeForm
        onSubmit={updateRecipe}
        defaultRecipe={recipe}
        isLoading={mutation.isPending}
        error={mutation.isError ? 'Failed to update recipe.' : undefined}
      />
    </Container>
  );
}

export default CreateRecipe;
