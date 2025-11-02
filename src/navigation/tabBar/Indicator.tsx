import React, { useEffect, useRef } from "react";
import { ViewStyle, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { fastSpring } from "@constants/easings";
import { useInsets } from "@hooks";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./tabBar.styles";
import physicsSpring from "@lib/physicSpring";

interface TabBarIndicatorProps {
  index?: number;
  count?: number;
}

export default function TabBarIndicator({ index = 0, count = 3 }: TabBarIndicatorProps): React.JSX.Element {
  const { width } = useWindowDimensions();
  const insets = useInsets();
  const { theme } = useUnistyles();
  const prevIndex = useRef(index);

  const x = useSharedValue(0);
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);
  const colorProgress = useSharedValue(index);

  const colors = [theme.colors.cyan, theme.colors.yellow, theme.colors.orange];
  const tabWidth = (width - 32) / count;
  const indicatorWidth = tabWidth - 32;

  const springCfg = physicsSpring({
    mass: fastSpring.mass,
    duration: 0.25,
    dampingRatio: 0.7,
  });

  useEffect(() => {
    if (count <= 0) return;

    const target = tabWidth * index + (tabWidth - indicatorWidth) / 2;
    const direction = Math.sign(index - prevIndex.current) || 1;
    prevIndex.current = index;

    x.value = withSpring(target, springCfg);

    scaleX.value = withSpring(
      1 + 0.2 * direction,
      springCfg,
      () => (scaleX.value = withSpring(1, springCfg))
    );
    scaleY.value = withSpring(0.875, springCfg, () => (scaleY.value = withSpring(1, springCfg)));

    colorProgress.value = withSpring(index, springCfg);
  }, [index, count, tabWidth, indicatorWidth]);

  const animatedStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [{ translateX: x.value }, { scaleX: scaleX.value }, { scaleY: scaleY.value }],

      backgroundColor: interpolateColor(
        colorProgress.value,
        colors.map((_, i) => i),
        colors
      ),
    })
  );

  return (
    <Animated.View
      style={[styles.indicator, animatedStyle, { width: indicatorWidth, bottom: insets.bottom }]}
    />
  );
}
