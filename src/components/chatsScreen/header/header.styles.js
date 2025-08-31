import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	header: {
		position: "absolute",
		top: 0,
		zIndex: 2,
		width: "100%",
		paddingHorizontal: theme.spacing.lg,
		backgroundColor: theme.colors.background,
		paddingBottom: theme.spacing.lg,
        alignItems: "center",
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
	inputWrapper: {
		height: 40,
		flexDirection: 'row',
		width: "100%",
		overflow: "hidden",
		gap: theme.spacing.sm,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.full,
		backgroundColor: theme.colors.foreground,
	},
	input: {
		fontSize: theme.fontSize.sm,
		lineHeight: theme.lineHeight.sm,
		paddingVertical: theme.spacing.sm,
		height: 40,
		textAlignVertical: "center",
		color: theme.colors.text,
		fontFamily: theme.fontFamily.medium,
	}
}));
