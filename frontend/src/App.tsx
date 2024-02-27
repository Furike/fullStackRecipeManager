import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Recipes from './components/Recipes';
import { ThemeProvider, createTheme } from '@mui/material';

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
        <Recipes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
