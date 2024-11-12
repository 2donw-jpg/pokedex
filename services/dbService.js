// dbService.js
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db, auth } from '@/services/firebaseConfig';
import { refreshTrainerData } from '@/services/sessionProfile';

//*GetUserProfile
export async function getUserProfile() {
  const user = auth.currentUser;
  
  if (!user) {
    console.error("[dbService/getUserProfile] No user is currently logged in.");
    return null; 
  }

  const docRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('[dbService/getUserProfile] Document data:', docSnap.data());
      return docSnap.data(); 
    } else {
      console.log('[dbService/getUserProfile] No such document!');
      return null; 
    }
  } catch (error) {
    logError('[dbService/getUserProfile] Error getting document:', error);
    return null; 
  }
}

//*CreateTrainer
export async function createTrainer(userId) {
  console.log("User ID used to create the profile:", userId);
  const trainerDocRef = doc(db, "trainers", userId);

  try {
    await setDoc(trainerDocRef, { pokemons: [] });
    console.log(`Trainer created for userId: ${userId}`);
  } catch (error) {
    logError("Error creating trainer:", error);
  }
}

// Add a caught Pokémon to the current user's profile
export async function addCaughtPokemon(pokemonId :number) {
  const user = auth.currentUser;

  if (!user) {
    console.error("[dbService/addCaughtPokemon] No user is currently logged in.");
    return;
  }

  const trainerDocRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(trainerDocRef);

    if (docSnap.exists()) {
      const currentPokemons = docSnap.data().pokemons || [];

      if (currentPokemons.includes(pokemonId)) {
        console.log(`[dbService/addCaughtPokemon] Pokemon ID ${pokemonId} is already caught.`);
        return; 
      }

      await updateDoc(trainerDocRef, {
        pokemons: arrayUnion(pokemonId) 
      });
      
      if (typeof refreshTrainerData === 'function') {
        await refreshTrainerData();
      }
      
      console.log(`[dbService/addCaughtPokemon] Pokemon ID ${pokemonId} added to trainer ${user.uid}.`);
    } else {
      console.log('[dbService/addCaughtPokemon] No trainer document found for the current user.');
    }
  } catch (error) {
    logError("Error adding caught Pokémon:", error);
  }
}

// Helper function for logging errors
const logError = (message, error) => {
  console.error(message, error);
};
