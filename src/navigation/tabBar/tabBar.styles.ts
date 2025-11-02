import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
	tabBar: {
		paddingTop: theme.spacing.lg,
		paddingHorizontal: theme.spacing.lg,
		bottom: 0,
		position: 'absolute',
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	indicator: {
       position: "absolute",
       left: theme.spacing.lg,
       borderCurve: 'continuous',
       opacity: theme.opacity.secondaryText,
       backgroundColor: theme.colors.primary,
       height: 44,
       borderRadius: theme.radius.full,
    },
	tabBarItem: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       height: 44,
    },
}));
