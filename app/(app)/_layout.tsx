import { Stack } from '@layouts/Stack'
import { screenTransition } from '@layouts/transition'
import { useSession } from '@providers/SessionProvider'
import { Redirect } from 'expo-router'

export default function AppLayout() {
  const { token } = useSession()

  if (token) return <Redirect href="/(auth)/Welcome" />

  return (
    <Stack id={undefined}>
      <Stack.Screen name="(tabs)" options={screenTransition()} />
      <Stack.Screen name="chat" options={screenTransition()} />
    </Stack>
  )
}
