import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="ranking" options={{ title: 'Ranking' , headerShown: false}} />
    </Tabs>
  );
}
