import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    gap: theme.spacing.sm - 2,
  },
  name: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xxl - 2,
    fontFamily: theme.fontFamily.semibold,
  },
  mail: {
    color: theme.colors.secondaryText,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.medium,
  },
}));
