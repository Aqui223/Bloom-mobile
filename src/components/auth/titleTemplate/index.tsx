import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { styles } from "./TitleTemplate.styles";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { Icon } from "@components/ui";
import { ICONS } from "@constants/icons";
import { useUnistyles } from "react-native-unistyles";

type TitleTemplateProps = {
  icon: keyof typeof ICONS;
  title: string;
};

export default function AuthTitleTemplate({ icon, title }: TitleTemplateProps): React.JSX.Element {
	const { progress } = useReanimatedKeyboardAnimation();
	const { theme } = useUnistyles();

	const animatedViewStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(progress.value, [0, 1], [1, 0.5], "clamp")}],
		transformOrigin: 'center-bottom'
	}))
  return (
    <View style={styles.titleContainer}>
      <Animated.View style={animatedViewStyle}>
        <Icon icon={icon} color={theme.colors.primary} size={108}/>
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
