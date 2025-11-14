import React from "react";
import { View } from "react-native";
import { styles } from "./Welcome.styles";
import AuthActions from "@components/auth/welcome/actions";

export default function AuthWelcome(): React.JSX.Element {
	return (
		<View style={styles.container}>
			<AuthActions />
		</View>
	);
}
