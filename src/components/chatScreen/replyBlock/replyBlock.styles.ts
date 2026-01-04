import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  replyWrapper: {
    padding: theme.spacing.xs,
    paddingBottom: 0,
  },
  replyChild: (isSend: boolean, isMe: boolean) => ({
    borderTopLeftRadius: isSend ? theme.radius.md : theme.radius.sm,
    borderTopRightRadius: isSend ? theme.radius.md : theme.radius.sm,
    borderBottomLeftRadius: theme.radius.xs,
    borderBottomRightRadius: theme.radius.xs,
    backgroundColor: isMe ? theme.colors.whiteBackdrop : theme.colors.foregroundTransparent,
    borderCurve: 'continuous',
    width: 'auto',
    maxWidth: '100%',
    flexDirection: 'row',
  }),
  replyTo: {
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
    flexShrink: 1,
    flexGrow: 1,
    minWidth: 0,
  },
  replyToName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semibold,
  },
  replyToMessage: {
    color: theme.colors.secondaryText,
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.sm,
  },
  button: {
    backgroundColor: 'transparent',
  },
}))
