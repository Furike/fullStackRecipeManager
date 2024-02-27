import { useState } from 'react';
import Search from '../components/Search';
import List from '../components/List';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Recipes() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3, color: 'primary.main' }}>
        Recipes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Button onClick={() => navigate('/recipes/new')}>
          Create new recipe
        </Button>
        <Search onChange={setTitle} />
        <List title={title} />
      </Box>
    </Container>
  );
}

export default Recipes;
