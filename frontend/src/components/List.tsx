import { useQuery } from '@tanstack/react-query';
import getRecipes from '../api/getRecipes';
import { Box, Paper, Skeleton, Typography } from '@mui/material';

type Props = {
  title: string;
};

function List({ title }: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ['recipes', { title }],
    queryFn: () => getRecipes(title),
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
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
            <Skeleton variant="rectangular" width={350} height={150} key={i} />
          ))
        : data.map((r) => (
            <Paper
              key={r.id}
              elevation={3}
              sx={{
                width: { xs: 1, md: 350 },
                minHeight: 150,
              }}
            >
              <Box sx={{ m: 3 }}>
                <Typography variant="h5">{r.title}</Typography>
                <Typography sx={{ mt: 2 }}>
                  {r.instructions.split('.')[0]}
                </Typography>
              </Box>
            </Paper>
          ))}
    </Box>
  );
}

export default List;
