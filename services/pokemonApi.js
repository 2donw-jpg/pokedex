import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const URLAb  = 'https://pokeapi.co/api/v2/ability';

/**
 * Fetches Pokémon data by ID or name.
 * @param {number|string} idOrName - Pokémon ID (1-151) or name (e.g., 'bulbasaur').
 * @returns {Promise<Object>} - Pokémon data object.
 */
export const fetchPokemon = async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      if (!response.ok) {
        throw new Error(`Error fetching Pokémon with ID/Name: ${idOrName}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      return null;
    }
  };

/**
 * Fetches a list of Pokémon (defaulting to the first 151 Pokémon).
 * @param {number} limit - Number of Pokémon to fetch.
 * @param {number} offset - Starting position (0 for first Pokémon).
 * @returns {Promise<Object[]>} - Array of Pokémon data objects.
 */

export const fetchPokemonList = async (limit = 151, offset = 0) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Error fetching Pokémon list');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
        return [];
    }
  };