import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchPokemonData } from '@/services/pokemonApi';

const PokemonProfileLayout = () => {

    const getPokemonList = async ()  => {
        const data = await fetchPokemonData();
        console.log(data.results);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image 
                    style={styles.profileImage}
                    source={{ uri: 'https://example.com/your-pokemon-character-image.jpg' }} 
                />
                <Text style={styles.profileName}>Ash Ketchum</Text>
                <Text style={styles.profileBio}>Pokémon Trainer & Master</Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Pokémon Team</Text>
                <View style={styles.pokemonList}>
                    <Image style={styles.pokemonImage} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }} />
                    <Image style={styles.pokemonImage} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' }} />
                    <Image style={styles.pokemonImage} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' }} />
                </View>

                <Text style={styles.sectionTitle}>Contact Information</Text>
                <Text style={styles.detailItem}>Email: ash.ketchum@example.com</Text>
                <Text style={styles.detailItem}>Phone: (123) 456-7890</Text>

                <Text style={styles.sectionTitle}>Social Links</Text>
                <TouchableOpacity onPress={() => {/* Handle GitHub link */}}>
                    <Text style={styles.linkItem}>GitHub: @ashketchum</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Handle Instagram link */}}>
                    <Text style={styles.linkItem}>Instagram: /ash.ketchum</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={getPokemonList}>
                    <Text style={styles.linkItem}>Click here to get the pokemon list</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#ffcc00', // Pokémon theme color
        borderRadius: 10,
        padding: 15,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderColor: '#ff0000',
        borderWidth: 3,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff0000', // Pokémon theme color
    },
    profileBio: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ff0000', // Pokémon theme color
    },
    detailItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    linkItem: {
        fontSize: 16,
        color: '#1E90FF',
        marginBottom: 5,
    },
    pokemonList: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    pokemonImage: {
        width: 50,
        height: 50,
        marginRight: 5,
    },
});

export default PokemonProfileLayout;
