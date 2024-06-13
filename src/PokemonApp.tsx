import 'react-native-gesture-handler';
import Navigator from './presentation/navigator/Navigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

const PokemonApp = () => {



  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Navigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}

export default PokemonApp;
