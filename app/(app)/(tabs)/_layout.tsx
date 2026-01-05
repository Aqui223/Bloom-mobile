import { Tabs } from 'expo-router'
import TabBar from 'src/navigation/tabBar/TabBar'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="friends" options={{ headerShown: false }} />
      <Tabs.Screen name="explore" options={{ headerShown: false }} />
      <Tabs.Screen name="chats" options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  )
}
