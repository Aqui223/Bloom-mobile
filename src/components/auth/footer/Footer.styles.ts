import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	footer: insets => ({ 
        width: "100%", 
        paddingHorizontal: 20, 
        paddingBottom: insets
     }),
     buttonLabel: {
        fontSize: theme.fontSize.lg,
        fontFamily: theme.fontFamily.semibold,
        color: theme.colors.text,
    },
    partsContainer: {
        flexDirection: "row",
    }
}));
