import { Box, Container, Typography } from '@mui/material';

export default function ErrorPage() {
  return (
    <Container sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
        }}
      >
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h4">
          Sorry, an unexpected error has occurred.
        </Typography>
      </Box>
    </Container>
  );
}
