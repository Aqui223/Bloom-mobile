import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",   
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    char: {
        fontSize: theme.fontSize.super,
        fontFamily: theme.fontFamily.bold,
        transformOrigin: 'center bottom 0px',
        color: theme.colors.primary,
    }
}))