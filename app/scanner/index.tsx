import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef } from "react";
import { router } from "expo-router";


const regex = /\d{3}/;

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);


/**
 * Gets the id of the pokemon, then it shows the pokemon data
 * @param {number} id - Identifier of the pokemon
 */

const handlePokemonScan = ({ data }) => {
  if (regex.test(data) && !qrLock.current) {
    const pokemonId = parseInt(data, 10); 
    qrLock.current = true;
    router.push(`/detail?codigo=${pokemonId}`);
  }
};

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handlePokemonScan}
      />
      <Overlay />
    </SafeAreaView>
  );
}

