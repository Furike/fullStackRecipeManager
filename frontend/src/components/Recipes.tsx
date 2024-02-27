import { useState } from 'react';
import Search from './Search';
import List from './List';
import { Box, Container, Typography } from '@mui/material';

function Recipes() {
  const [title, setTitle] = useState('');

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
        <Search onChange={setTitle} />
        <List title={title} />
      </Box>
    </Container>
  );
}

export default Recipes;
