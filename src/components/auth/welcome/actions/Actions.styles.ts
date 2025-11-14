import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	actionsContainer: insets => ({ 
        width: "100%", 
        gap: 16, 
        paddingHorizontal: 20, 
        flexDirection: "column", 
        paddingBottom: insets
     }),
    separatorContainer: {
        paddingHorizontal: theme.spacing.lg,
    },
    button: (focus) => ({
        backgroundColor: focus ? theme.colors.text : theme.colors.foreground,
    }),
    buttonLabel: (focus) => ({
        fontFamily: theme.fontFamily.semibold,
        color: focus ? theme.colors.background : theme.colors.text,
    }),
    imageIcon: {
        width: 28, 
        height: 28,
    } 
}));
