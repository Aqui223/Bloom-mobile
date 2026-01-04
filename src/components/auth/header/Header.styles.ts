import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  header: (paddingTop: number) => ({
    width: '100%',
    padding: theme.spacing.xl,
    position: 'absolute',
    top: 0,
    paddingTop,
    zIndex: 1,
    left: 0,
    right: 0,
  }),
}))
