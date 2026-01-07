import { Stack } from '@layouts/Stack'
import { screenTransition } from '@layouts/transition'

export default function AppLayout() {
  return (
    <Stack id={undefined}>
      <Stack.Screen name="(tabs)" options={screenTransition()} />
      <Stack.Screen name="chat/[chat]" options={screenTransition()} />
    </Stack>
  )
}
