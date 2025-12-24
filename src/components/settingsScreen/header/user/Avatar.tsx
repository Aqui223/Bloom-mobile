import FastImage from "@d11/react-native-fast-image";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import useSettingsScreenStore from "@stores/settingsScreen";
import { BlurView, BlurViewProps } from "expo-blur";
import { ViewStyle } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { styles } from "./User.styles";
import React from "react";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function HeaderAvatar({ scrollY }: { scrollY: SharedValue<number> }): React.JSX.Element {
  const { snapEndPosition } = useSettingsScreenStore();
  const { theme } = useUnistyles();

  const animatedStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [
        {
          scale: interpolate(
            scrollY.get(),
            [-snapEndPosition / 2, 0, snapEndPosition],
            [1.35, 1, 0.25],
            "clamp"
          ),
        },
        { translateY: interpolate(scrollY.get(), [0, snapEndPosition], [0, -30], "clamp") },
      ],
      opacity: interpolate(scrollY.get(), [0, snapEndPosition], [1, 0], "clamp"),
      borderRadius: interpolate(scrollY.get(), [-snapEndPosition / 3, 0], [theme.radius.lg, 50], "clamp"),
    })
  );

  const animatedBlurStyle = useAnimatedProps(
    (): BlurViewProps => ({
      intensity: interpolate(scrollY.get(), [0, snapEndPosition], [0, 64], "clamp"),
    })
  );

  return (
    <Animated.View style={[styles.avatarWrapper, animatedStyle]}>
      <FastImage
        source={{
          uri: "https://i.pinimg.com/1200x/39/8e/a1/398ea106afa43c01bd87a8ede3c180a9.jpg",
        }}
        style={styles.avatar}
      />
      <AnimatedBlurView
        tint='dark'
        experimentalBlurMethod='dimezisBlurView'
        animatedProps={animatedBlurStyle}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}
