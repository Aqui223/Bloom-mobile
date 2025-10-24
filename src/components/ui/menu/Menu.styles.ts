import { StyleSheet } from "react-native-unistyles";

type MenuWrapperStyleProps = {
  top?: number;
};

export const styles = StyleSheet.create(theme => ({
  backdrop: {
    position: "absolute",
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
  },
  menuWrapper: ({ top }: MenuWrapperStyleProps) => ({
    position: "absolute",
    right: 0,
    left: 0,
    paddingHorizontal: 16,
    top,
    zIndex: 10,
  }),
  menu: (bluredBackdrop: boolean) => ({
    paddingVertical: theme.spacing.sm,
    transformOrigin: 'top right',
    alignSelf: 'flex-end',
    backgroundColor: bluredBackdrop ? theme.colors.foreground : 'transparent',
    borderCurve: 'continuous',
    overflow: 'hidden',
    height: 'auto',
  }),
  option: {
    padding: theme.spacing.lg,
    paddingRight: theme.spacing.xl,
    alignItems: 'center',
    maxHeight: 60,
    flex: 1,
    gap: theme.spacing.md,
    flexDirection: 'row',
  },
  optionText:(color?: string) => ({
    fontSize: theme.fontSize.md,
    color,
    fontFamily: theme.fontFamily.medium
  }),
  separator: {
    flex: 1,
    height: 2,
    maxHeight: 2,
    marginVertical: theme.spacing.sm,
    backgroundColor: theme.colors.border,
  }
}));
