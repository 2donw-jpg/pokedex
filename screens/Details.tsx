import React, { useEffect, useState } from 'react'
import {Text, View, Image, StyleSheet,SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import Poke from '../types/Pokemon';



const baseUrlAPI = 'https://pokeapi.co/api/v2/pokemon';
const URLAb  = 'https://pokeapi.co/api/v2/ability';


const Details = ({navigation, route}) => {
  const [contenido, setContenido] = useState<Poke>();
  const [ability, setAbility] = useState<PokeAbility>();

  const loadPoke = async ()=>{
    const codigo = route.params.codigo;
    const result  = await axios.get(`${baseUrlAPI}/${codigo}`);
    const resultAbilities = await axios.get(`${URLAb}/${codigo}`); 

    if(result.data){
      setContenido(result.data);
    }

    if(resultAbilities.data){
      setAbility(resultAbilities.data); 
    }
  };

  useEffect(()=>{
    loadPoke(); 
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <View>
          <Image
            style={styles.ImagePokemon}
            source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/2a6a6b66983a97a6bdc889b9e0a2a42a25e2522e/sprites/pokemon/${route.params.codigo}.png`,}}
          />
        </View>
        <View style={styles.roundedView1}>
          <Text style={styles.containeText}>ID: {contenido?.id}</Text>
          <Text style={styles.containeText}>Nombre:{contenido?.name}</Text>
          <Text style={styles.containeText}>Altura: {contenido?.height} cm</Text>
          <Text style={styles.containeText}>Experiencia Base: {contenido?.base_experience}</Text>
          <Text style={styles.containeText}>Especie Predeterminado: {contenido?.is_default ? 'Si' : 'No'}</Text>
          <Text style={styles.containeText}>Orden de Clasificacion: {contenido?.order}</Text>
          <Text style={styles.containeText}>Peso: {contenido?.weight} hg</Text>
        </View>
        <View style={styles.roundedView2}>
          <Text style={styles.containeText}>Habilidades</Text>
          <Text style={styles.containeText}>Oculto: {ability?.is_hidden ? 'Si' : 'No'}</Text>
          <Text style={styles.containeText}>Serie Principal: {ability?.is_main_series ? 'Si' : 'No'}</Text>
          <Text style={styles.containeText}>Nombre de Habilidad: {ability?.name}</Text>
          <Text>{ability?.flavor_text}</Text>
        </View>
      </View>  
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  ImagePokemon: {
      height: 200,
      width: 200,
      marginRight: 10,
      alignSelf: 'center',
      borderWidth: 2, 
      borderColor: 'black',
      marginTop:50,
  },
  container:{
    flex:1,
    backgroundColor: '#ffa400',
  },
  containeText:{
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  roundedView1: {
    width: 300,
    height: 160,
    backgroundColor: '#ffde00', 
    borderRadius: 20,
    alignSelf: 'center',
    marginTop:20,
  },
  roundedView2: {
    width: 300,
    height: 95,
    backgroundColor: '#ffde00', 
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 30
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: 'center'
  },
});
export default Details;
