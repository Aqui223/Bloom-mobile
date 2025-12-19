import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import Icon from "../Icon";
import { useUnistyles } from "react-native-unistyles";
import { charAnimationIn, charAnimationOut, zoomAnimationIn, zoomAnimationOut } from "@constants/animations";
import { styles } from "./Checkbox.styles";

type CheckboxProps = {
  onValueChange?: (value: boolean) => void;
  value: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: React.Ref<View>;
};

export default function Checkbox({
  onValueChange,
  value,
  style,
  ref,
  ...props
}: CheckboxProps): React.JSX.Element {
  const { theme } = useUnistyles();

  return (
    <Pressable onPress={() => onValueChange?.(!value)} style={[styles.checkbox, style]} {...props}>
      {value ? (
        <>
          <Animated.View style={styles.background} entering={zoomAnimationIn} exiting={zoomAnimationOut} key='checkboxBackground' />
          <Animated.View entering={charAnimationIn} exiting={charAnimationOut} key='checkboxIcon'>
            <Icon icon='checkmark' size={16} color={theme.colors.white} />
          </Animated.View>
        </>
      ) : null}
    </Pressable>
  );
}
