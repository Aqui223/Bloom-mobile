import AuthFooter from '@components/auth/footer'
import AuthHeader from '@components/auth/header'
import { Stack } from '@layouts/stack'
import { View } from 'react-native'

export default function AuthLayout() {
  return (
    <Stack
      id={undefined}
      screenOptions={{ headerShown: false }}
      layout={({ children, navigation }) => (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <AuthHeader navigation={navigation} />
          {children}
          <AuthFooter navigation={navigation} />
        </View>
      )}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signup/email" options={{ headerShown: false }} />
      <Stack.Screen name="signup/otp" options={{ headerShown: false }} />
      <Stack.Screen name="signup/password" options={{ headerShown: false }} />
    </Stack>
  )
}
