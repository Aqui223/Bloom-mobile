import { StyleSheet } from "react-native-unistyles";

type MenuWrapperStyleProps = {
  top?: number;
  open?: boolean;
};

export const styles = StyleSheet.create(theme => ({
  backdrop: {
    position: "absolute",
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
  },
  menuWrapper: ({ open, top }: MenuWrapperStyleProps) => ({
    position: "absolute",
    right: 0,
    left: 0,
    paddingHorizontal: 16,
    top,
    zIndex: 10,
    alignItems: 'flex-end',
    pointerEvents: open ? "auto" : "none",
  }),
  menu: (bluredBackdrop: boolean) => ({
    paddingVertical: theme.spacing.sm,
    transformOrigin: 'top right',
    backgroundColor: bluredBackdrop ? theme.colors.foreground : 'transparent',
    borderCurve: 'continuous',
    overflow: 'hidden',
  }),
  option: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.md,
    flexDirection: 'row',
  },
  optionText:(color?: string) => ({
    fontSize: theme.fontSize.md,
    color,
    fontFamily: theme.fontFamily.medium
  })
}));
