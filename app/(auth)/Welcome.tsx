import AuthActions from '@components/auth/welcome/actions'
import AuthTitle from '@components/auth/welcome/title'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function Welcome() {
  return (
    <View style={styles.container}>
      <AuthTitle />
      <AuthActions />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.background,
  },
}))
