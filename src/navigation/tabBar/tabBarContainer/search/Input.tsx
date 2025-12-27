import React, { Ref } from "react";
import Animated from "react-native-reanimated";
import { Icon, Input } from "@components/ui";
import { getFadeIn, getFadeOut, layoutAnimation } from "@constants/animations";
import useTabBarStore from "@stores/tabBar";
import { TextInput } from "react-native";
import { useUnistyles } from "react-native-unistyles";

const AnimatedInput = Animated.createAnimatedComponent(Input);

type TabBarSearchInputProps = {
    ref: Ref<TextInput>;
}

export default function TabBarSearchInput({ref}: TabBarSearchInputProps): React.JSX.Element {
  const { searchValue, setSearchValue, setIsSearchFocused } = useTabBarStore();
  const { theme } = useUnistyles();

  return (
    <AnimatedInput
      ref={ref}
      value={searchValue}
      size="lg"
      onChangeText={setSearchValue}
      onFocus={() => setIsSearchFocused(true)}
      viewStyle={{ backgroundColor: 'transparent'}}
      onBlur={() => setIsSearchFocused(false)}
      placeholder="Поиск по чатам"
      icon={<Icon size={22} color={theme.colors.secondaryText} icon="magnifyingglass"/>}
      submitBehavior="blurAndSubmit"
      layout={layoutAnimation}
      returnKeyType="search"
      entering={getFadeIn()}
      exiting={getFadeOut()}
    />
  );
};
