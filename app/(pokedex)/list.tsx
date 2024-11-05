import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Pressable, ActivityIndicator, Text } from 'react-native';
import { fetchPokemonData } from '@/services/pokemonApi';
import PokemonList from '@/components/PokemonList';
import { router } from 'expo-router';
import { getUserProfile } from '@/services/dbService';
import { DocumentData } from 'firebase/firestore';
import { getPokemonPoints, calculateTotalPoints } from '@/services/pokemonRanking';

const PokemonScreen = () => {
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DocumentData>();

  useEffect(() => {
    const loadPokemonData = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemonData();
        const userProfile = await getUserProfile();
        setProfile(userProfile);
        setContenido(data.results);
        console.log(profile);
         // Guardar el perfil obtenido
      } catch (error) {
        console.error("Failed to load Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonData();
  }, []);


  const totalPoints = profile && profile.pokemons ? calculateTotalPoints(profile.pokemons) : 0;


  const handlePress = (index) => {
    router.push(`/detail?codigo=${index}`); 
  };

  return (
    <>    
      <Pressable onPress={() => router.push("/scanner")}>
        <Text>Scan here</Text>
      </Pressable>

      <Text>Puntos totales: {totalPoints}</Text>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {contenido.map((p, index) => (
            <Pressable key={p.name} onPress={() => handlePress(index + 1)} style={{ pointerEvents: 'auto' }}>
              <PokemonList 
                code={index + 1} 
                pokemons={p} 
                isCaught={profile && profile.pokemons && profile.pokemons.includes(index + 1)} 
                value={getPokemonPoints(index + 1)}
              />
            </Pressable>
          ))}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PokemonScreen;
