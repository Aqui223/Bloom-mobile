import { useInsets } from "@hooks";
import TabBarItem from "./Item";
import { LayoutChangeEvent, View } from "react-native";
import { styles } from "./TabBar.styles";
import TabBarIndicator from "./Indicator";
import { GradientBlur } from "@components/ui";
import { Haptics } from "react-native-nitro-haptics";
import useTabBarStore from "@stores/tabBar";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import TabBarSearchButton from "./SearchButton";
import { springyTabBar } from "@constants/animations";
import { useCallback } from "react";

export default function TabBar({ state, navigation }) {
  const insets = useInsets();
  const { setTabBarHeight, isSearch, tabBarHeight } = useTabBarStore();
  const tabBarWidth = useSharedValue(0);

  const animatedViewStyle = useAnimatedStyle(() => {
    return tabBarWidth.value > 0
      ? {
          height: withSpring(isSearch ? 48 : 54, springyTabBar),
          width: withSpring(isSearch ? 48 : tabBarWidth.value, springyTabBar),
        }
      : {};
  });

  const onLayoutTabBar = useCallback((event: LayoutChangeEvent, isContainer: boolean = false) => {
    const { layout } = event.nativeEvent;

    if (tabBarWidth.value === 0) tabBarWidth.value = layout.width;

    if (tabBarHeight === 0 && isContainer) setTabBarHeight(layout.height);
  }, []);

  const onPress = useCallback((route, focused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      Haptics.impact("light");
      navigation.navigate(route.name);
    }
  }, []);

  return (
    <View
      onLayout={(event) => onLayoutTabBar(event, true)}
      style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}
    >
      <GradientBlur />
      <Animated.View onLayout={(event) => onLayoutTabBar(event)} style={[styles.tabBar, animatedViewStyle]}>
        <TabBarIndicator index={state.index} count={state.routes.length} />
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          return (
            <TabBarItem
              key={route.key}
              route={route}
              focused={focused}
              onPress={() => onPress(route, focused)}
            />
          );
        })}
      </Animated.View>
      <TabBarSearchButton />
    </View>
  );
}
