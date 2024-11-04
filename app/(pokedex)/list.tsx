// PokemonScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Pressable, ActivityIndicator, Text } from 'react-native';
import { fetchPokemonData, fetchPokemon } from '@/services/pokemonApi'; // Import fetch function
import PokemonList from '@/components/PokemonList'; // Import PokemonList component
import { router } from 'expo-router';


const PokemonScreen = () => {
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const data = await fetchPokemonData();
        setContenido(data.results); // Use `results` from API response
      } catch (error) {
        console.error("Failed to load Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonData();
  }, []);

  const handlePress = (index) => {
    console.log(`Pressed Pokémon #${index}`);
    router.push(`/detail?codigo=${index}`); 
  };

  return (
    <>    
    <Pressable onPress={() => router.push("/scanner")}>
      <Text>Scan here</Text>
    </Pressable>

    <Text>Puntos totales: 400</Text>
    <SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
      showsHorizontalScrollIndicator={false}>
        {contenido.map((p, index) => (
          <Pressable key={p.name} onPress={() => handlePress(index + 1)} style={{ pointerEvents: 'auto' }}>
            <PokemonList codigo={index + 1} pokemons={p} isCaught={true} value={10}/>
          </Pressable>
        ))}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </SafeAreaView>
    </>

  );
};



export default PokemonScreen;
