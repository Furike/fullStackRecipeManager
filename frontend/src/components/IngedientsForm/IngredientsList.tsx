import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateRecipeInput } from 'backend/src/modules/recipe/schema';

type Props = {
  ingredients: CreateRecipeInput['ingredients'];
  removeIngredient: (index: number) => void;
};

function IngredientsForm({ ingredients, removeIngredient }: Props) {
  if (!ingredients.length) {
    return (
      <Box textAlign={'center'}>
        <Typography>Add some ingredients</Typography>
      </Box>
    );
  }

  return (
    <List>
      {ingredients.map(({ name, quantity, unit }, i) => {
        return (
          <ListItem
            key={i}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeIngredient(i)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${quantity}${unit} ${name}`} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default IngredientsForm;
