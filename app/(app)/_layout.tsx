import { useTokenCheck } from '@hooks'
import { Stack } from '@layouts/stack'
import { Redirect } from 'expo-router'

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useTokenCheck()
  if (isLoading) return null

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />
  }

  return (
    <Stack id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  )
}
