import React from "react";
import { View } from "react-native";
import { styles } from "./Welcome.styles";
import AuthTitle from "@components/auth/welcome/title";

export default function AuthWelcome(): React.JSX.Element {
	return (
		<View style={styles.container}>
			<AuthTitle/>
		</View>
	);
}
