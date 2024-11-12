import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, Pressable, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { fetchPokemonData } from '@/services/pokemonApi';
import PokemonList from '@/components/PokemonList';
import { router } from 'expo-router';
import { getPokemonPoints, calculateTotalPoints } from '@/services/pokemonRanking';
import { fetchTrainerData } from '@/services/sessionProfile';
//import useAuth from '@/hooks/useAuth';

interface Profile {
  pokemons:[],
  total_points:0,
}

//TODO: Learn how the react hooks work, man
const PokemonScreen = () => {
  const [contenido, setContenido] = useState<Object | null>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [totalPoints, setTotalPoints] = useState(0);

  // Redirect if user is not authenticated
/*   useEffect(() => {
    !user ? router.push('/signIn'): loadData()
  }, [user, router]); */

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await fetchPokemonData();
      const userProfile = await fetchTrainerData();

      if (data && data.results) {
        setContenido(data.results);
      }
      
      if (userProfile) {
        setProfile(userProfile);
        setTotalPoints(calculateTotalPoints(userProfile.pokemons));
      }

      console.log('[list/loadData] Pokemon Data:', data?.results);
      console.log('[list/loadData] Profile:', userProfile);

    } catch (error) {
      console.error("Failed to load Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  
  //*Load Data
  useEffect(() => {loadData();}, []);


  

  //* Loading Indicator
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (!contenido || !profile) {
    return <Text>Loading profile...</Text>;
  }

  //* Redirect to pokemon detail
  
  const handlePress = (pokemonIndex: number) => {
    const route = `/details?codigo=${pokemonIndex.toString()}`;
    // @ts-ignore
    router.push(route);
  };



  return (
    <>
      {/* Scan Button */}
      <Pressable onPress={() => router.push("/scanner")}>
        <Text style={styles.scanButton}>Scan here</Text>
      </Pressable>

      {/* Total Points Display */}
      <Text style={styles.totalPoints}>Puntos totales: {totalPoints}</Text>

      {/* Pokémon List Section */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Render Pokémon List */}
          {contenido.map((p, index) => (
            <Pressable
              key={p.name}
              onPress={() => handlePress(index + 1)}
              style={styles.pokemonPressable}
            >
              <PokemonList
                code={index + 1}
                pokemons={p}
                isCaught={profile?.pokemons.includes(index + 1) ?? false}
                value={getPokemonPoints(index + 1)}
              />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 10,
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pokemonPressable: {
    marginBottom: 10, // Adds spacing between Pokémon items
  },
  loadingIndicator: {
    marginVertical: 20, // Adds space before/after loading indicator
  },
});

export default PokemonScreen;
