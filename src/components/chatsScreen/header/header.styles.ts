import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  header: {
    position: "absolute",
    top: 0,
    zIndex: 2,
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    alignItems: "center",
    gap: theme.spacing.lg,
  },
  topHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "transparent",
  },
  inView: {
    height: 44,
    width: 44,
  },
  buttonsWrapper: {
    backgroundColor: theme.colors.foregroundBlur,
    borderRadius: theme.radius.full,
    borderCurve: "continuous",
    position: "absolute",
    right: 0,
    gap: theme.spacing.xs,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.xs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  text: (connecting: boolean) => ({
    color: connecting ? theme.colors.yellow : theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.bold,
  }),
}));
