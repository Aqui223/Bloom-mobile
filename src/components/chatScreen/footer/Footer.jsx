import { Pressable, TextInput } from "react-native";
import { styles } from "./Footer.styles";
import useInsets from "@hooks/UseInsets";
import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";
import { useState } from "react";
import Animated, {
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { quickSpring } from "@constants/Easings";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const zoomAnimation = {
  entering: ZoomIn.springify()
    .mass(quickSpring.mass)
    .damping(quickSpring.damping)
    .stiffness(quickSpring.stiffness),
  exiting: ZoomOut.springify()
    .mass(quickSpring.mass)
    .damping(quickSpring.damping)
    .stiffness(quickSpring.stiffness),
};

const layoutAnimation = LinearTransition.springify()
  .mass(quickSpring.mass)
  .damping(quickSpring.damping)
  .stiffness(quickSpring.stiffness);

const ActionButton = ({ icon, isSendButton, onPress }) => {
  const { theme } = useUnistyles();
  const color = isSendButton ? theme.colors.white : theme.colors.text;

  return (
    <AnimatedPressable
      {...zoomAnimation}
      style={styles.button(isSendButton)}
      onPress={onPress}
    >
      <Icon icon={icon} size={24} color={color} />
    </AnimatedPressable>
  );
};

export default function Footer({ onSend }) {
  const insets = useInsets();
  const { theme } = useUnistyles();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    if (value.trim() !== "") {
      onSend(value);
      setValue("");
    }
  };

  const hasValue = value.trim() !== "";

  return (
    <Animated.View
      style={[styles.footer, { paddingBottom: focused ? 16 : insets.bottom }]}
    >
      {!hasValue && (
        <>
          <ActionButton icon="dots" />
          <ActionButton icon="face.smile" />
        </>
      )}

      <AnimatedTextInput
        layout={layoutAnimation}
        style={styles.input}
        onSubmitEditing={handleSend}
        onChangeText={setValue}
        onFocus={() => setFocused(true)}
        submitBehavior="submit"
        onBlur={() => setFocused(false)}
        selectionColor={theme.colors.secondaryText}
        returnKeyType="send"
        value={value}
        placeholderTextColor={theme.colors.secondaryText}
        placeholder="Введите сообщение..."
      />

      {hasValue && (
        <ActionButton icon="paperplane" isSendButton onPress={handleSend} />
      )}
    </Animated.View>
  );
}
