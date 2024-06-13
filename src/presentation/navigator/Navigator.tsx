

import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/search/SearchScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PokemonScreen from '../screens/pokemon/PokemonScreen';

export type RootStackParamList = {
    HomeScreen: undefined;
    SearchScreen: undefined;
    PokemonScreen: { pokemonId: number };
}


const Stack = createStackNavigator<RootStackParamList>();


const Navigator = () => {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                // cardStyle:{
                //     backgroundColor: colors.background
                // }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />

        </Stack.Navigator>
    )
}

export default Navigator;
