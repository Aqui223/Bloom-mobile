import { Pressable, Text } from "react-native";
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { styles } from "./Button.styles";
import { fastSpring } from "@constants/Easings";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({ onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.05, fastSpring);
  };

  const handleRelease = () => {
    scale.value = withSpring(1, fastSpring);
  };

  return (
    <AnimatedPressable style={[styles.button, animatedStyle]} onPressIn={handlePress} onPressOut={handleRelease}>
      <Text style={styles.text}>Приступим!</Text>
    </AnimatedPressable>
  );
}
