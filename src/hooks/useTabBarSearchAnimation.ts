import { useWindowDimensions, ViewStyle } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  AnimatedStyle,
  runOnJS,
  useAnimatedProps,
  interpolateColor,
  AnimatedProps,
} from "react-native-reanimated";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { springyTabBar } from "@constants/animations";
import useTabBarStore from "@stores/tabBar";
import { useUnistyles } from "react-native-unistyles";
import { useEffect, useState } from "react";
import { PathProps } from "react-native-svg";

type SearchButtonAnimation = {
  animatedPressableStyle: AnimatedStyle<ViewStyle>;
  animatedIconStyle: AnimatedStyle<ViewStyle>;
  animatedIconProps: AnimatedProps<PathProps>;
  pressableOpacity: (toFull: boolean) => void;
  searchWidth: number;
  isDismiss: boolean;
  isLayoutAnimation: boolean;
};

export default function useTabBarSearchAnimation(): SearchButtonAnimation {
  const opacity = useSharedValue<number>(1);
  const defaultWidth = useSharedValue<number>(54);
  const iconColor = useSharedValue<number>(0);
  const { width } = useWindowDimensions();
  const { theme } = useUnistyles();
  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();
  const { isSearch, isSearchFocused, searchValue } = useTabBarStore();
  const [isLayoutAnimation, setIsLayoutAnimation] = useState<boolean>(false);

  const isSearchValue = searchValue.trim().length > 0
  const searchWidth = width - 48 - theme.spacing.md;
  const isDismiss = isSearchFocused || isSearchValue;

  const animatedPressableStyle = useAnimatedStyle((): ViewStyle => {
    const baseWidth = isDismiss ? defaultWidth.get() - 48 - theme.spacing.md : defaultWidth.get();

    return {
      opacity: opacity.get(),
      width: interpolate(keyboardProgress.get(), [0, 1], [baseWidth, searchWidth - theme.spacing.lg * 2]),
      height: withSpring(isSearch ? 48 : 54, springyTabBar),
    };
  });

  const animatedIconStyle = useAnimatedStyle((): ViewStyle => {
    return {
      transform: [{ scale: withSpring(isSearch ? 22 / 30 : 1, springyTabBar) }],
    };
  });

  const animatedIconProps = useAnimatedProps((): PathProps => {
    iconColor.set(withSpring(isSearch ? isSearchValue ? 0 : 1 : 0, springyTabBar))
    return {
    fill: interpolateColor(iconColor.get(), [0, 1], [theme.colors.text, theme.colors.secondaryText])
    }
  }, [isSearch, isSearchValue])

  const pressableOpacity = (toFull = true) => {
    opacity.set(withSpring(toFull ? 1 : 0.8, springyTabBar));
  };

  useEffect(() => {
    setIsLayoutAnimation(false);
    defaultWidth.set(withSpring(isSearch ? searchWidth - theme.spacing.xxxl * 2 : 54, springyTabBar, (finished: boolean) => {
      if (finished) runOnJS(setIsLayoutAnimation)(true);
    }));
  }, [isSearch]);

  return {
    animatedPressableStyle,
    animatedIconStyle,
    animatedIconProps,
    pressableOpacity,
    searchWidth,
    isDismiss,
    isLayoutAnimation,
  };
}
