import Svg, { Path } from "react-native-svg";
import { ICONS } from "@constants/icons";
import Animated, { AnimatedProps } from "react-native-reanimated";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type IconProps = {
	size?: number;
	color?: string;
	icon: keyof typeof ICONS;
	style?: StyleProp<ViewStyle>;
	animatedProps?: AnimatedProps<typeof AnimatedPath>;
	ref?: React.Ref<any>;
};

export default function Icon({ size = 26, color = "white", icon, style, animatedProps, ref }: IconProps): React.JSX.Element {
	const pathData = ICONS[icon];
    
	return (
		<Svg ref={ref} style={style} width={size} height={size} viewBox='0 0 24 24' fill='none'>
			{animatedProps ? <AnimatedPath animatedProps={animatedProps} fill={color} d={pathData} /> : <Path fill={color} d={pathData} />}
		</Svg>
	);
}
