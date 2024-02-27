import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Recipes from './pages/Recipes';
import ErrorPage from './pages/ErrorPage';
import RecipeDetail from './pages/CreateRecipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Recipes />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/recipes',
    element: <Recipes />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/recipes/new',
    element: <RecipeDetail />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: '#59D5E0',
    },
    secondary: {
      main: '#FAA300',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
