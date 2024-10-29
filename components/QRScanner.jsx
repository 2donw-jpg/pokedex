import React, { useState , useEffect} from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchPokemon } from '../services/pokemonApi'
import { useCameraPermissions } from "expo-camera";



export default function QRScanner ({ onPokemonCaught}) {
    
  const [permission, requestPermissions] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(true);
        })();
    }, []);


    const handleBarCodeScanned = async ({data}) => {
      setScanned(status === 'granted');
    try{
        const pokemon = await fetchPokemon(data);
        Alert.alert('Pokemon Caught!', `You caught ${pokemon.name}`);
        onPokemonCaught(pokemon);
    } catch(error){
        Alert.alert('Error', 'Failed to catch Pokemon');
    }
    };

    if (hasPermission === null){
        return <Text>Requesting for camera permission...</Text>
    }

    if (hasPermission  === false){
        return <Text>No access to camera</Text> ;
    }


    return (
        <View style={styles.container}>
          <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          )}

          
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});