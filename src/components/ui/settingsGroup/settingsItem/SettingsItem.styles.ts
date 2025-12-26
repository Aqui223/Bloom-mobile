import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    borderCurve: 'continuous',
    borderRadius: theme.radius.xxs,
    minHeight: 56,
    backgroundColor: theme.colors.foreground,
  },
  label: (button: boolean, color: string) => ({
    fontSize: button ? theme.fontSize.lg : theme.fontSize.md,
    color: button ? theme.colors[color] : theme.colors.text,
    flex: button ? 0 : 1,
    fontFamily: theme.fontFamily.medium,
  }),
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    height: 32,
    minWidth: 32,
    gap: theme.spacing.sm,
  },
  badgeLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.secondaryText,
    fontFamily: theme.fontFamily.medium,
  },
}));