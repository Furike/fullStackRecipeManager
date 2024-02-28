import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Recipes from './pages/Recipes';
import ErrorPage from './pages/ErrorPage';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';

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
    element: <CreateRecipe />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/recipes/:id',
    element: <RecipeDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/recipes/:id/edit',
    element: <EditRecipe />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#ff4081',
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
