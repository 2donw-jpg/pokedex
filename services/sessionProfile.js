import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '@/services/dbService.js';
const CACHE_KEY = 'profileData';

export const refreshTrainerData = async () => {
    try{
    const response = await getUserProfile();
    const data = await response;
  
    await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data })
      );
      console.log("[sessionProfile/fetchTrainerData] Profile Data(Firebase call)")
      return data;
    } catch (error) {
      console.error("Error fetching Trainer data:", error);
      throw error;
    }
}

export const fetchTrainerData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data } = JSON.parse(cachedData);
        if (data != null || data != undefined){
            console.log("[sessionProfile/fetchTrainerData] Profile Data(Cache Call)")
            return data;
        }
      }

    refreshTrainerData();
    } catch (error) {
      console.error("Error fetching Trainer data:", error);
      throw error;
    }
  };