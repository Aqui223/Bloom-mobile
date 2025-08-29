import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
  chat: {
    flexDirection: "row",
    paddingRight: theme.spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
  },
  avatarWrapper: {
    padding: theme.spacing.md,
    paddingLeft: theme.spacing.lg,
  },
  content: {
    justifyContent: "center",
    flex: 1,
    gap: theme.spacing.sm,
    borderBottomColor: theme.colors.foreground,
    borderBottomWidth: 1,
    paddingVertical: theme.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    alignItems: "center",
  },
  name: {
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
    fontFamily: theme.fontFamily.semibold,
  },
  nameWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  time: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.secondaryText,
    fontFamily: theme.fontFamily.medium,
  },
  message: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.secondaryText,
    fontFamily: theme.fontFamily.medium,
  },
  unreadMark: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
}));