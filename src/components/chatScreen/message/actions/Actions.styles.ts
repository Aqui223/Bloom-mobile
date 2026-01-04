import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  messageActions: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    right: 0,
    position: 'absolute',
  },
  delete: {
    backgroundColor: theme.colors.redBackdrop,
  },
  copy: {
    backgroundColor: theme.colors.primaryBackdrop,
  },
  reply: {
    backgroundColor: theme.colors.yellowBackdrop,
  },
}))
