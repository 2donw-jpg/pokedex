import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="(pokedex)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
    </Stack>
  );
}
