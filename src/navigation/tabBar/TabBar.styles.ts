import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	tabBarContainer: {
		padding: theme.spacing.xxxl,
		bottom: 0,
		position: "absolute",
		flexDirection: "row",
		gap: theme.spacing.md,
		alignItems: "center",
		justifyContent: "center",
	},
	tabBar: {
		flex: 1,
		height: 54,
		backgroundColor: theme.colors.foregroundBlur,
		borderRadius: theme.radius.full,
		overflow: "hidden",
		flexDirection: "row",
		borderCurve: "continuous",
		padding: theme.spacing.xs,
		alignItems: "center",
		justifyContent: "center",
	},
	indicator: {
		position: "absolute",
		top: theme.spacing.xs,
		left: theme.spacing.xs,
		borderCurve: "continuous",
		backgroundColor: theme.colors.tabBarIndicator,
		height: 54 - theme.spacing.xs * 2,
		borderRadius: theme.radius.full,
	},
	tabBarItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 54 - theme.spacing.xs * 2,
	},
	searchButton: {
		width: 54,
		height: 54,
		borderRadius: theme.radius.full,
		backgroundColor: theme.colors.foregroundBlur,
		alignItems: "center",
		justifyContent: "center",
	},
}));
