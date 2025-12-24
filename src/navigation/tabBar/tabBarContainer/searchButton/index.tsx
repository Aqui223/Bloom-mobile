import React, { useRef } from "react";
import { Pressable, TextInput, StyleSheet, LayoutAnimation } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "./ActionButton.styles";
import { BlurView } from "expo-blur";
import { Button, Icon } from "@components/ui";
import useTabBarStore from "@stores/tabBar";
import { useUnistyles } from "react-native-unistyles";
import {
  charAnimationIn,
  charAnimationOut,
  getFadeIn,
  getFadeOut,
  layoutAnimation,
  zoomAnimationIn,
  zoomAnimationOut,
} from "@constants/animations";
import { springyTabBar } from "@constants/animations";
import { useTabBarSearchAnimation } from "@hooks";
import TabBarSearchInput from "./SearchInput";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarSearchButton(): React.JSX.Element {
  const ref = useRef<TextInput>(null);
  const { theme } = useUnistyles();
  const { isSearch, activeTab, setIsSearch, setSearchValue } = useTabBarStore();

  const {
    animatedPressableStyle,
    animatedIconStyle,
    animatedIconProps,
    pressableOpacity,
    isDismiss,
    isLayoutAnimation,
  } = useTabBarSearchAnimation();

  const settingsTab = activeTab === 2

  return (
    <>
      <AnimatedPressable
        style={[styles.searchButton, animatedPressableStyle]}
        onPress={() => settingsTab ? {} : setIsSearch(!isSearch)}
        onTouchStart={() => pressableOpacity(false)}
        onTouchEnd={() => pressableOpacity(true)}
        layout={isLayoutAnimation ? layoutAnimation : null}
      >
        <BlurView style={StyleSheet.absoluteFill} intensity={40} tint='systemChromeMaterialDark' />

        {settingsTab ? (
          <Animated.View key="editButton" entering={charAnimationIn} exiting={charAnimationOut}>
            <Icon icon='pencil' color={theme.colors.text} size={30} />
          </Animated.View>
        ) : (
          <Animated.View key="searchButton" entering={charAnimationIn} exiting={charAnimationOut} style={animatedIconStyle}>
            <Icon icon='magnifyingglass' animatedProps={animatedIconProps} size={30} />
          </Animated.View>
        )}

        {isSearch && <TabBarSearchInput ref={ref} />}
      </AnimatedPressable>

      {isDismiss && (
        <Animated.View exiting={getFadeOut(springyTabBar)} entering={getFadeIn(springyTabBar)}>
          <Button
            size='lg'
            variant='icon'
            blur
            onPress={() => {
              ref.current?.blur();
              setSearchValue("");
            }}
          >
            <Icon icon='x' size={26} color={theme.colors.text} />
          </Button>
        </Animated.View>
      )}
    </>
  );
}
