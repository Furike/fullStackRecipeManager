import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecipes from '../api/getRecipes';
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Skeleton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IngredientsFilter from './IngredientsFilter';

type Props = {
  title: string;
};

function List({ title }: Props) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ['recipes', { title }],
    queryFn: () => getRecipes(title),
  });

  if (error || !data) {
    return (
      <Container>
        <Typography variant="h1">No Recipes found</Typography>
      </Container>
    );
  }

  const uniqueIngredientNames = data.reduce((accumulator, currentValue) => {
    currentValue.ingredients.forEach(({ name }) => {
      if (!accumulator.includes(name)) {
        accumulator.push(name);
      }
    });
    return accumulator;
  }, [] as string[]);

  const filteredRecipes = selectedIngredients.length
    ? data.filter((recipe) =>
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.find(({ name }) => name === ingredient),
        ),
      )
    : data;

  return (
    <>
      <IngredientsFilter
        ingredientNames={uniqueIngredientNames}
        selectedNames={selectedIngredients}
        setSelectedNames={setSelectedIngredients}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {isPending
          ? [1, 2, 3].map((_, i) => (
              <Skeleton
                variant="rectangular"
                width={350}
                height={150}
                key={i}
              />
            ))
          : filteredRecipes.map((r) => (
              <Card
                key={r.id}
                elevation={3}
                sx={{
                  width: { xs: 1, md: 350 },
                  minHeight: 150,
                }}
              >
                <Box sx={{ m: 3 }}>
                  <Typography variant="h5">{r.title}</Typography>
                  <Typography sx={{ mt: 2 }}>{r.instructions}</Typography>
                </Box>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/recipes/${r.id}`)}
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            ))}
      </Box>
    </>
  );
}

export default List;
