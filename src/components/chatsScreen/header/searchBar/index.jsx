import { Pressable, TextInput, useWindowDimensions } from "react-native";
import { styles } from "./SearchBar.styles";
import { useRef } from "react";
import { useUnistyles } from "react-native-unistyles";
import Icon from "@components/ui/Icon";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import useChatsScreenStore from "@stores/ChatsScreen";
import { fastSpring } from "@constants/easings";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SearchBar({ value, setValue, scrollY, focusedValue }) {
  const { theme } = useUnistyles();
  const { width: screenWidth } = useWindowDimensions();
  const inputRef = useRef(null);
  const initialWidth = useSharedValue(0);
  const width = useSharedValue(0);
  const { setFocused, setQuery } = useChatsScreenStore();

  const fullWidth = screenWidth - theme.spacing.lg * 2;
  const nestedWidth = fullWidth - theme.spacing.lg * 2 - theme.spacing.sm * 2;

  const onInputLayout = (e) => {
    if (initialWidth.value === 0) {
      const w = e.nativeEvent.layout.width;
      initialWidth.value = w;
      width.value = w;
    }
  };

  const handleFocus = () => {
    focusedValue.value = withSpring(0, fastSpring);
    setFocused(true);
    if (fullWidth) {
      width.value = withSpring(nestedWidth, fastSpring);
    }
  };

  const handleBlur = () => {
    focusedValue.value = withSpring(1, fastSpring);
    setFocused(false);
    if (!value) {
      width.value = withSpring(initialWidth.value, fastSpring);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value || undefined,
  }));

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const interpolatedWidth = fullWidth
      ? interpolate(
          scrollY.value,
          [0, 56],
          [fullWidth, initialWidth.value + 58],
          "clamp"
        )
      : undefined;

    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 56], [0, -0], "clamp"),
        },
      ],
      width: interpolate(focusedValue.value, [0, 1], [fullWidth, interpolatedWidth], "clamp"),
    };
  });

  return (
    <AnimatedPressable
      onPress={() => inputRef.current?.focus()}
      style={[styles.inputWrapper, animatedWrapperStyle]}
    >
      <Icon
        icon="magnifyingglass"
        size={24}
        color={theme.colors.secondaryText}
      />
      <AnimatedTextInput
        ref={inputRef}
        onLayout={onInputLayout}
        onBlur={handleBlur}
        onChangeText={(text) => {setValue(text); setQuery(text)}}
        selectionColor={theme.colors.secondaryText}
        value={value}
        placeholderTextColor={theme.colors.secondaryText}
        onFocus={handleFocus}
        placeholder="Поиск по чатам"
        style={[styles.input, animatedStyle]}
      />
    </AnimatedPressable>
  );
}
