

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import PokeballBg from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/Navigator';
import FullScreenLoader from '../../components/ui/FullScreenLoader';


interface Porps extends StackScreenProps<RootStackParamList, 'HomeScreen'> { }


const HomeScreen = ({ navigation }: Porps) => {
    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const theme = useTheme();

    //* Esta es la forma tradicional de una petición http
    // const {isLoading, data: pokemons = [] } = useQuery({
    //   queryKey: ['pokemons'],
    //   queryFn: () => getPokemons(0),
    //   staleTime: 1000 * 60 * 60, // 60 minutes
    // });

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutes
        queryFn: async params => {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
    });



    return (
        <View style={[globalTheme.globalMargin, { flex: 1, }]}>
            <PokeballBg style={style.imgPosition} />
            {isLoading ? <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
            }}>

                <ActivityIndicator size={80} />

            </View> :
                <>
                    <FlatList
                        data={data?.pages.flat() ?? []}
                        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                        numColumns={2}
                        style={{ paddingTop: top + 20 }}
                        ListHeaderComponent={() => (
                            <Text variant='displayMedium'>Pokedex</Text>)
                        }
                        renderItem={({ item: pokemon }) => (<PokemonCard pokemon={pokemon} />)}
                        onEndReachedThreshold={0.6}
                        onEndReached={() => fetchNextPage()}
                        showsVerticalScrollIndicator={false}
                    />
                    <FAB
                        label='Buscar'
                        style={[globalTheme.fab,
                        { backgroundColor: theme.colors.primary }]
                        }
                        mode='elevated'
                        color={theme.dark ? 'white' : 'black'}
                        onPress={() => navigation.push('SearchScreen')}
                    />
                </>}


        </View>
    )
}

const style = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
})

export default HomeScreen;
