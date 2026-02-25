import AuthFooter from '@components/auth/footer'
import AuthHeader from '@components/auth/header'
import { Stack } from '@layouts/Stack'
import { screenTransition } from '@layouts/transition'
import { useSession } from '@providers/SessionProvider'
import { Redirect } from 'expo-router'
import { View } from 'react-native'

export default function AuthLayout() {
  const { token } = useSession()

  if (token) return <Redirect href="/(app)/(tabs)" />

  return (
    <Stack
      id={undefined}
      layout={({ children }) => (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <AuthHeader />
          {children}
          <AuthFooter />
        </View>
      )}
    >
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="signup/Email" options={screenTransition()} />
      <Stack.Screen name="signup/Otp" options={screenTransition()} />
      <Stack.Screen name="signup/Password" options={screenTransition()} />
    </Stack>
  )
}
