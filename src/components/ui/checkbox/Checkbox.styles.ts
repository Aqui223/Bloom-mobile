import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: theme.colors.foregroundTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: theme.radius.full,
  },
  background: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}))
