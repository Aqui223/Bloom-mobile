import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { styles } from "./Separator.styles";

type SeparatorProps = {
    label?: string;
    style?: StyleProp<ViewStyle>;
};

export default function Separator({ label, style }: SeparatorProps): React.JSX.Element {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.line} />
			{label && (
				<>
					<Text style={styles.label}>{label}</Text> <View style={styles.line} />
				</>
			)}
		</View>
	);
}
