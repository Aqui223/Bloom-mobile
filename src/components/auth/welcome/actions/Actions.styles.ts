import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  actionsContainer: (paddingBottom: number) => ({
    width: '100%',
    gap: theme.spacing.lg,
    backgroundColor: theme.colors.foreground,
    paddingHorizontal: theme.spacing.xxxl,
    flexDirection: 'column',
    paddingTop: theme.spacing.xxxl,
    borderTopLeftRadius: 26 + theme.spacing.xxxl,
    borderTopRightRadius: 26 + theme.spacing.xxxl,
    borderCurve: 'continuous',
    paddingBottom: paddingBottom + theme.spacing.lg,
  }),
  separatorContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  button: (focus) => ({
    backgroundColor: focus ? theme.colors.text : theme.colors.foregroundTransparent,
  }),
  buttonLabel: (focus) => ({
    fontFamily: theme.fontFamily.semibold,
    color: focus ? theme.colors.background : theme.colors.text,
  }),
  imageIcon: {
    width: 26,
    height: 26,
  },
}))
