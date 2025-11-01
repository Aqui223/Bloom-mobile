import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
  message: (isMe: boolean) => ({
    padding: theme.spacing.md,
    maxWidth: "82%",
    minWidth: 56,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    zIndex: 10,
    backgroundColor: isMe ? theme.colors.primary : theme.colors.foreground,
    transformOrigin: isMe
      ? { x: 'right', y: 'bottom' }
      : { x: 'left', y: 'bottom' },
    alignItems: 'center',
  }),
  messageWrapper: (isMe: boolean) => ({
    gap: theme.spacing.md,
    position: "relative",
    transformOrigin: isMe
      ? { x: 'right', y: 'bottom' }
      : { x: 'left', y: 'bottom' },
    paddingBottom: theme.spacing.lg,
    alignItems: isMe ? "flex-end" : "flex-start",
  }),
  text: (isMe: boolean) => ({
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.medium,
    color: isMe ? theme.colors.white : theme.colors.text,
    textAlign: "left"
  }),
  metaRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  metaRowText: {
    color: theme.colors.secondaryText,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    fontFamily: theme.fontFamily.medium,
  },
  metaRowSeparator: {
    height: 4,
    width: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.secondaryText,
  },
  tail: (isMe: boolean) => ({
    position: "absolute",
    right: isMe ? 0 : undefined,
    left: isMe ? undefined : 0,
    transform: isMe ? [{ scale: 1 }] : [{ scaleX: -1 }],
    bottom: 0,
  }),
}));