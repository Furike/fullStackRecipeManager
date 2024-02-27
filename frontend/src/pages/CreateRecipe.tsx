import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import IngredientsForm from '../components/IngedientsForm/IngredientsForm';

function CreateRecipe() {
  const [title, setTitle] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<
    CreateRecipeInput['ingredients']
  >([]);

  const createRecipe = () => {
    if (!(title && instructions)) {
      return;
    }
    const newRecipe: CreateRecipeInput = {
      title,
      instructions,
      ingredients,
    };
    setTitle(null);
    setInstructions(null);
    setIngredients([]);
    console.log({ newRecipe });
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
          disabled={!ingredients.length || !title || !instructions}
          onClick={createRecipe}
        >
          Create recipe
        </Button>
      </Box>
    </Container>
  );
}

export default CreateRecipe;
