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
                    <Text style={styles.nombreEnFicha}>No. {props.codigo} {props.pokemons.name}</Text>
                </View>
            </View>   
        </View>
            
    );  
};
const styles = StyleSheet.create({
    contenedorPokemon: {
      height: 90,
      backgroundColor: "#CBCBCB", // Primary color
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5,
      padding: 5,
      borderStyle: 'solid',
      borderStartWidth: 7,
      borderBottomEndRadius: 50 ,
      borderTopEndRadius: 50,
      borderColor: '#Bf070D', // Secondary color
    },
    nombreEnFicha: {
      fontSize: 24,
      color: '#121212', // Secondary color
      fontWeight: 'bold',
    },
    contenedorDatosGenerales: {
      display: 'flex',
      flexDirection: 'column',
        
    },
    ImagePokemon: {
      height: 76,
      width: 100,
      marginRight: 10,
    },
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0", // Secondary color
      paddingHorizontal: 10,
      paddingVertical: 3
    },
  });
  

export default PokemonList;