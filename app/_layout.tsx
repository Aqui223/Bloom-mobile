import ChatsProvider from '@api/providers/ChatsContext'
import MessagesProvider from '@api/providers/MessagesContext'
import SeenMessagesProvider from '@api/providers/SeenMessagesContext'
import { WebSocketProvider } from '@api/providers/WebSocketContext'
import { PortalProvider } from '@gorhom/portal'
import { Stack } from '@layouts/stack'
import initRealm from '@lib/initRealm'
import { createSecureStorage } from '@lib/storage'
import useStorageStore from '@stores/storage'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles'

enableScreens()

const fontsToLoad = {
  'OpenRunde-Regular': require('@assets/fonts/OpenRunde-Regular.ttf'),
  'OpenRunde-Medium': require('@assets/fonts/OpenRunde-Medium.ttf'),
  'OpenRunde-Semibold': require('@assets/fonts/OpenRunde-Semibold.ttf'),
  'OpenRunde-Bold': require('@assets/fonts/OpenRunde-Bold.ttf'),
}

export default function RootLayout() {
  const [_fontsLoaded, _fontError] = useFonts(fontsToLoad)
  const { theme } = useUnistyles()

  const { setMMKV, setRealm } = useStorageStore()

  useEffect(() => {
    ;(async () => {
      try {
        const storage = await createSecureStorage('user-storage')
        const realm = await initRealm()
        setMMKV(storage)
        setRealm(realm)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  useEffect(() => {
    UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background)
  }, [theme])

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <StatusBar style="auto" />
            <WebSocketProvider>
              <ChatsProvider>
                <MessagesProvider>
                  <SeenMessagesProvider>
                    <Stack id={undefined} screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(app)" options={{ headerShown: false }} />
                      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    </Stack>
                  </SeenMessagesProvider>
                </MessagesProvider>
              </ChatsProvider>
            </WebSocketProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
