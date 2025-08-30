import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
    header: {
		width: "100%",
		paddingHorizontal: theme.spacing.lg,
		backgroundColor: theme.colors.background,
		paddingBottom: theme.spacing.lg,
        flexDirection: "row",
		zIndex: 1,
        alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing.lg,
	},
    title: {
		fontSize: theme.fontSize.md,
        lineHeight: theme.lineHeight.md,
		color: theme.colors.text,
		fontFamily: theme.fontFamily.semibold,
	},
	topHeader: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	button: {
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.full,
		backgroundColor: theme.colors.foreground,
	},
	time: {
		fontSize: theme.fontSize.sm,
		lineHeight: theme.lineHeight.sm,
		color: theme.colors.secondaryText,
		fontFamily: theme.fontFamily.medium,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: theme.radius.full,
	},
	titleWrapper: {
		alignItems: "center",
        flex: 1,
		justifyContent: "center",
		gap: theme.spacing.xs,
	},
}));