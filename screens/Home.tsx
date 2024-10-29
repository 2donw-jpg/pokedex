import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView,} from 'react-native';
import axios from 'axios';
import Poke from '../types/Pokemon';
import PokemonResult from '../types/PokemonResult';
import PokemonList from '../components/PokemonList';

const baseUrlAPI = 'https://pokeapi.co/api/v2/pokemon';
const vInicial: Poke[] = [];

const Home = ({navigation}) => {
  const [contenido, setContenido] = useState(vInicial);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState('');
  const [loading, setLoading] = useState(false);


  const solicitud = async()=>{
    try {
      const result  = await axios.get(`${baseUrlAPI}`);
      if(result.data){
        const datos:PokemonResult = result.data;
        setCount(datos.count);
        if(datos.next == null){
          setNext('')
        }else{
          setNext(datos.next);
        }
        
        if(datos.previous == null){
          setPrevious('');
        }else{
          setPrevious(datos.previous as string);
        }
        setContenido(datos.results);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async()=>{
    if(next !== ''){
      setLoading(true);
      const result  = await axios.get(next);
      if(result.data){
        const datos:PokemonResult = result.data;
        if(datos.next == null){
          setNext('')
        }else{
          setNext(datos.next);
        }
        if(datos.previous == null){
          setPrevious('');
        }else{
          setPrevious(datos.previous as string);
        }
        setContenido([...contenido,...datos.results]);
      }
    }
  };

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >= 
    contentSize.height - paddingToBottom
    );
};

const handleScroll = ({nativeEvent}) =>{
  if(isCloseToBottom(nativeEvent)){
    if(!loading){
      nextPage();
    }
  }
}

const handlePress = (codigo:number) => {
  navigation.navigate('Details', {codigo:codigo});
};

useEffect(()=> {
  solicitud();
}, []);

useEffect(()=> {
  setLoading(false);
}, [contenido]);

  return (
    <SafeAreaView>
      <ScrollView onScroll={handleScroll}>
          {contenido.map((p, index) => (
            <Pressable key={p.name} onPress={() => handlePress(index + 1)}>
              <PokemonList codigo={index + 1} pokemons={p} />
            </Pressable>
          ))}
          {loading && <ActivityIndicator size={'large'}/>}
      </ScrollView>
    </SafeAreaView>
  );

};
export default Home;