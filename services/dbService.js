import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from '@/services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getUserProfile() {
  //getAuthUser();
  try {
    const docRef = doc(db, "trainers", "master");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null; 
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
}