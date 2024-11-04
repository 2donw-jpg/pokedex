import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="list" options={{ title: 'Pokemons'}} />
      <Tabs.Screen name="ranking" options={{ title: 'Rango' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil'}} />
    </Tabs>
  );
}
