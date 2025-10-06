import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme: any) => ({
	base: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		borderRadius: theme.radius.full,
        backgroundColor: theme.colors.foreground,
		minWidth: 36,
	},
}));
