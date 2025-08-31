import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	tabBar: {
		paddingTop: theme.spacing.sm,
		paddingHorizontal: theme.spacing.lg,
		bottom: 0,
		backgroundColor: theme.colors.background,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	}
}));
