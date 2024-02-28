import { Container, Typography } from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import createRecipeMutation from '../api/createRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

function CreateRecipe() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createRecipeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate('/');
    },
    onError: (e) => console.log(e),
  });

  const createRecipe = (newRecipe: CreateRecipeInput) => {
    mutation.mutate(newRecipe);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mb: 3, color: 'primary.main' }}>
        Create a new recipe
      </Typography>
      <RecipeForm
        onSubmit={createRecipe}
        isLoading={mutation.isPending}
        error={mutation.isError ? 'Failed to create recipe.' : undefined}
      />
    </Container>
  );
}

export default CreateRecipe;
