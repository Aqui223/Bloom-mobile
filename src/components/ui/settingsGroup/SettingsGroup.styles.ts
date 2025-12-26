import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
  container: {
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  group: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.sm,
    borderCurve: 'continuous',
    overflow: "hidden",
  },
  description: {
    marginHorizontal: theme.radius.xxl /2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.secondaryText,
    fontFamily: theme.fontFamily.medium
  }
}));