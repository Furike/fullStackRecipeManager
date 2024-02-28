import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import getRecipe from '../api/getRecipe';
import DeleteRecipeModal from '../components/DeleteRecipeModal';

function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const recipeId = parseInt(id || '');

  const { isPending, error, data } = useQuery({
    queryKey: ['recipe', { id }],
    queryFn: () => getRecipe(recipeId),
    enabled: Boolean(recipeId),
  });

  if (isPending) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  if (!recipeId || error || !data) {
    return (
      <Container>
        <Typography variant="h1" sx={{ mb: 3, color: 'primary.main' }}>
          No Recipe found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3, color: 'primary.main' }}>
        {data.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={() => navigate('/')}>Back to all recipes</Button>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={() => navigate(`/recipes/${data.id}/edit`)}>
            Edit recipe
          </Button>
          <DeleteRecipeModal id={data.id} />
        </Box>
      </Box>

      <Typography variant="h2" sx={{ mt: 3, color: 'secondary.main' }}>
        Ingredients
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
        {data.ingredients.map(({ id, quantity, unit, name }) => (
          <Typography key={id}>{`${quantity} ${unit} ${name}`}</Typography>
        ))}
      </Box>
      <Typography variant="h2" sx={{ mt: 3, color: 'secondary.main' }}>
        Instructions
      </Typography>
      <Typography>{data.instructions}</Typography>
    </Container>
  );
}

export default RecipeDetail;
