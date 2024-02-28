import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import IngredientsForm from '../components/IngedientsForm/IngredientsForm';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSubmit: (recipe: CreateRecipeInput) => void;
  isLoading?: boolean;
  error?: string;
  defaultRecipe?: CreateRecipeInput;
};

function CreateRecipe({ onSubmit, isLoading, error, defaultRecipe }: Props) {
  const [title, setTitle] = useState<string | null>(
    defaultRecipe?.title ?? null,
  );
  const [instructions, setInstructions] = useState<string | null>(
    defaultRecipe?.instructions ?? null,
  );
  const [ingredients, setIngredients] = useState<
    CreateRecipeInput['ingredients']
  >(defaultRecipe?.ingredients ?? []);

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!(title && instructions)) {
      return;
    }
    const recipe = {
      title,
      instructions,
      ingredients,
    };
    onSubmit(recipe);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        disabled={!ingredients.length || !title || !instructions || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <CircularProgress size={30} /> : 'Save'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <Button fullWidth variant="outlined" onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </Box>
  );
}

export default CreateRecipe;
