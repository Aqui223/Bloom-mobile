import { useTokenCheck } from '@hooks'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isAuthenticated, isLoading } = useTokenCheck()

  if (isLoading) {
    return null
  }
  return isAuthenticated ? <Redirect href="/(app)/(tabs)/chats" /> : <Redirect href="/(auth)/welcome" />
}
