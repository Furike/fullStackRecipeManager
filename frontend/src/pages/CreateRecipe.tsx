import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import IngredientsForm from '../components/IngedientsForm/IngredientsForm';
import createRecipeMutation from '../api/createRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [title, setTitle] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<
    CreateRecipeInput['ingredients']
  >([]);

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

  const createRecipe = () => {
    if (!(title && instructions)) {
      return;
    }
    const newRecipe: CreateRecipeInput = {
      title,
      instructions,
      ingredients,
    };
    mutation.mutate(newRecipe);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h3" sx={{ mb: 3, color: 'primary.main' }}>
          Create a new recipe
        </Typography>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          error={title === ''}
          helperText={title === '' && 'Title is required'}
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="instructions"
          label="Instructions"
          error={instructions === ''}
          helperText={instructions === '' && 'Instructions are required'}
          multiline
          rows={10}
          value={instructions || ''}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <IngredientsForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={
            !ingredients.length || !title || !instructions || mutation.isPending
          }
          onClick={createRecipe}
        >
          {mutation.isPending ? (
            <CircularProgress size={30} />
          ) : (
            'Create recipe'
          )}
        </Button>
        {mutation.isError && (
          <Alert severity="error">
            Failed to create recipe. Please check your input and try again.
          </Alert>
        )}
        <Button fullWidth variant="outlined" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}

export default CreateRecipe;
