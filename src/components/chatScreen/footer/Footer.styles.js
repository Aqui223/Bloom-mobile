import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  footer: {
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.lg,
    flexDirection: "row",
    gap: theme.spacing.lg,
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    height: 40,
    zIndex: 1,
    textAlignVertical: "center",
    borderCurve: 'continuous',
    color: theme.colors.text,
    borderRadius: theme.radius.full,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.medium,
    backgroundColor: theme.colors.foreground,
    borderWidth: 0,
  },
}));
