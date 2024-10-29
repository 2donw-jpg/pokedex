import React from "react";
import Poke from "../types/Pokemon";
import { StyleSheet, Text, View, Image } from "react-native";
import QRScanner from "./QRScanner";


type PokemonProps = {
    codigo: number,
    pokemons: Poke;
};

const PokemonList = (props: PokemonProps) =>{
    return(
        <View style={styles.container}>
            <View style={styles.contenedorPokemon}>
                <Image 
                style={styles.ImagePokemon}
                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/2a6a6b66983a97a6bdc889b9e0a2a42a25e2522e/sprites/pokemon/${props.codigo}.png`}}/>
                <View style = {styles.contenedorDatosGenerales }>
                    <Text style={styles.nombreEnFicha}>{props.pokemons.name}</Text>
                    <Text style={styles.nombreEnFicha}>ID: {props.codigo}</Text>
                </View>
            </View>   
        </View>
            
    );  
};
const styles = StyleSheet.create({
    contenedorPokemon:{
        height: 90,
        backgroundColor: "#ffa400",
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#341257',
        borderRadius: 45,
    },
    nombreEnFicha:{
        fontSize: 24,
        color: '#332911',
        fontWeight: 'bold',
    },
    contenedorDatosGenerales: {
        display:'flex',
        flexDirection: 'column',
    },
    ImagePokemon: {
        height: 76,
        width: 100,
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#ffde00",

      },
});


export default PokemonList;