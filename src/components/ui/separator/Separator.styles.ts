import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  line: {
    height: 1,
    flex: 1,
    backgroundColor: theme.colors.text,
    opacity: theme.opacity.secondaryText,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.medium,
    opacity: theme.opacity.contentText,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
}))
