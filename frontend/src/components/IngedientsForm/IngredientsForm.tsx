import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';
import IngredientsList from './IngredientsList';

type Props = {
  ingredients: CreateRecipeInput['ingredients'];
  setIngredients: (ingredients: CreateRecipeInput['ingredients']) => void;
};

function IngredientsForm({ ingredients, setIngredients }: Props) {
  const [ingredientQuantity, setIngredientQuantity] = useState<string | null>(
    null,
  );
  const [ingredientUnit, setIngredientUnit] = useState<string | null>(null);
  const [ingredientName, setIngredientName] = useState<string | null>(null);

  const addIngredient = () => {
    if (!(ingredientQuantity && ingredientUnit && ingredientName)) {
      return;
    }
    setIngredients([
      ...ingredients,
      {
        quantity: parseFloat(ingredientQuantity),
        unit: ingredientUnit,
        name: ingredientName,
      },
    ]);
    setIngredientQuantity(null);
    setIngredientUnit(null);
    setIngredientName(null);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h4">Ingredients</Typography>
      <Grid container>
        <Grid item xs={6} md={2}>
          <TextField
            id="ingredient-quantity"
            label="Quantity"
            type="number"
            error={ingredientQuantity === ''}
            helperText={ingredientQuantity === '' && 'Quantity is required'}
            variant="outlined"
            size="small"
            fullWidth
            value={ingredientQuantity || ''}
            onChange={(e) => setIngredientQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            id="ingredient-unit"
            label="Unit"
            error={ingredientUnit === ''}
            helperText={ingredientUnit === '' && 'Unit is required'}
            variant="outlined"
            size="small"
            fullWidth
            value={ingredientUnit || ''}
            onChange={(e) => setIngredientUnit(e.target.value)}
          />
        </Grid>
        <Grid item xs md={6}>
          <TextField
            id="ingredient-name"
            label="Ingredient"
            error={ingredientName === ''}
            helperText={ingredientName === '' && 'Name is required'}
            variant="outlined"
            size="small"
            fullWidth
            value={ingredientName || ''}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              fullWidth
              disabled={
                !(ingredientQuantity && ingredientUnit && ingredientName)
              }
              onClick={addIngredient}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      <IngredientsList
        ingredients={ingredients}
        removeIngredient={removeIngredient}
      />
    </Box>
  );
}

export default IngredientsForm;
