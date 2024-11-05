import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PokemonProps {
    code: number;
    pokemons: {
        name: string;
    };
    isCaught: boolean;
    value: number | null;
}

const PokemonList = (props: PokemonProps) => {
    const { code, pokemons, isCaught, value } = props;
    return (
        <View style={styles.container}>
            <View style={styles.contenedorPokemon}>
                <Image 
                    style={[styles.imagePokemon]}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/2a6a6b66983a97a6bdc889b9e0a2a42a25e2522e/sprites/pokemon/${code}.png` }}
                />
                <View style={styles.contenedorDatosGenerales}>
                    <Text style={styles.nombreEnFicha}>No.{code}  {pokemons.name}</Text>
                    {isCaught && <Text style={styles.pokemonCaught}>+{value}</Text>}
                </View>
            </View>
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },

    contenedorPokemon: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderLeftColor: '#e74c3c',
        borderLeftWidth: 10, 
        padding: 10,
/*         shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2, */
        elevation: 3,
        marginVertical: 5,
    },

    imagePokemon: {
        width: 80, 
        height: 80,
        marginRight: 10,
    },
    
    contenedorDatosGenerales: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    nombreEnFicha: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    pokemonCaught: {
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PokemonList;
