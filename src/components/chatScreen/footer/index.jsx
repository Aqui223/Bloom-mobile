import { Keyboard, Pressable, TextInput } from "react-native";
import { styles } from "./Footer.styles";
import useInsets from "@hooks/useInsets";
import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";
import { useEffect, useState } from "react";
import Animated, {
  LinearTransition
} from "react-native-reanimated";
import { quickSpring } from "@constants/Easings";
import { Button } from "@components/ui";
import { zoomAnimationIn, zoomAnimationOut } from "@constants/animations";

const AnimatedButton = Animated.createAnimatedComponent(Button);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const layoutAnimation = LinearTransition.springify()
  .mass(quickSpring.mass)
  .damping(quickSpring.damping)
  .stiffness(quickSpring.stiffness);

export default function Footer({ isAllKeys, onSend }) {
  const insets = useInsets();
  const { theme } = useUnistyles();
  const [value, setValue] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
   const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
    }); 
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [])
  
  const handleSend = () => {
    if (value.trim() !== "") {
      onSend(value.trim());
      setValue("");
    }
  };

  const hasValue = value.trim() !== "";

  return (
    <Animated.View
      style={[styles.footer, { paddingBottom: keyboardVisible ? 16 : insets.bottom, opacity: isAllKeys ? 1 : 0.5, pointerEvents: isAllKeys ? 'auto' : 'none' }]}
    >
      {!hasValue && (
        <>
        <AnimatedButton exiting={zoomAnimationOut} entering={zoomAnimationIn} variant="icon">
          <Icon icon="image" size={24} color={theme.colors.text} />
        </AnimatedButton>
         <AnimatedButton exiting={zoomAnimationOut} entering={zoomAnimationIn} variant="icon">
          <Icon icon="face.smile" size={24} color={theme.colors.text} />
        </AnimatedButton>
        </>
      )}

      <AnimatedTextInput
        layout={layoutAnimation}
        style={styles.input}
        onChangeText={setValue}
        numberOfLines={4}
        keyboardAppearance="dark"
        multiline
        submitBehavior="newline"
        cursorColor={theme.colors.secondaryText}
        selectionColor={theme.colors.secondaryText}
        returnKeyType="previous"
        value={value}
        placeholderTextColor={theme.colors.secondaryText}
        placeholder="Cообщение..."
      />

      {hasValue && (
          <AnimatedButton exiting={zoomAnimationOut} entering={zoomAnimationIn} onPress={handleSend} style={{ backgroundColor: theme.colors.primary}} variant="icon">
          <Icon icon="paperplane" size={24} color={theme.colors.white} />
        </AnimatedButton>
      )}
    </Animated.View>
  );
}
