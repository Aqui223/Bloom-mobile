import { StyleSheet } from "react-native-unistyles";

type InputStyleProps = {
    height: number;
    disabled: boolean;
};	

export const styles = StyleSheet.create(theme => ({
    inputWrapper: ({height, disabled }:InputStyleProps) => ({
       width: "100%",   
       height,
       backgroundColor: theme.colors.foregroundTransparent,
       borderRadius: theme.radius.full,
       flexDirection: 'row',
       alignItems: 'center',
    }),
     input: {
    flex: 1,
    paddingLeft: theme.spacing.lg,
    paddingVertical: 10,
    height: 'auto',
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.medium,
    borderWidth: 0,
  },
}));
