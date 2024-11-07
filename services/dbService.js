// dbService.js
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db, auth } from '@/services/firebaseConfig';


//*GetUserProfile
export async function getUserProfile() {
  const user = auth.currentUser;
  console.log('User: ', user.uid);

  if (!user) {
    console.error("No user is currently logged in.");
    return null; 
  }

  const docRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data(); // Return the user's profile data
    } else {
      console.log('No such document!');
      return null; 
    }
  } catch (error) {
    logError('Error getting document:', error);
    return null; // Return null in case of an error
  }
}

//*CreateTrainer
export async function createTrainer(userId) {
  console.log("User Id being use to create the profile: ", userId);
  const trainerDocRef = doc(db, "trainers", userId);

  try {
    await setDoc(trainerDocRef, { pokemons: [] });
    console.log(`Trainer created for userId: ${userId}`);
  } catch (error) {
    logError("Error creating trainer:", error);
  }
}

// Add a caught Pokémon to the current user's profile
export async function addCaughtPokemon(pokemonId) {
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is currently logged in.");
    return; // Early return if no user is authenticated
  }

  const trainerDocRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(trainerDocRef);

    if (docSnap.exists()) {
      const currentPokemons = docSnap.data().pokemons || [];

      if (currentPokemons.includes(pokemonId)) {
        console.log(`Pokemon ID ${pokemonId} is already caught.`);
        return; // Early return if Pokémon is already caught
      }

      await updateDoc(trainerDocRef, {
        pokemons: arrayUnion(pokemonId) // Add Pokémon ID to the array
      });

      console.log(`Pokemon ID ${pokemonId} added to trainer ${user.uid}.`);
    } else {
      console.log('No trainer document found for the current user.');
    }
  } catch (error) {
    logError("Error adding caught Pokémon:", error);
  }
}

// Helper function for logging errors
const logError = (message, error) => {
  console.error(message, error);
};
