import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Recipes from './components/Recipes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Recipes />
    </QueryClientProvider>
  );
}

export default App;
