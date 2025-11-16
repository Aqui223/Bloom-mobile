import { Button, Icon } from "@components/ui";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { styles } from "./Header.styles";
import { useInsets } from "@hooks";
import { quickSpring } from "@constants/easings";

export default function AuthHeader({ navigation }) {
  const insets = useInsets();

  const currentRoute = navigation.getState()?.index;

  const animatedViewStyle = useAnimatedStyle(() => ({
    opacity: withSpring(currentRoute === 0 ? 0 : 1, quickSpring),
    transform: [{ translateY: withSpring(currentRoute === 0 ? "-20%" : "0%", quickSpring) }],
  }));

  return (
    <Animated.View style={[styles.header(insets.top), animatedViewStyle]}>
      <Button onPress={() => navigation.goBack()} variant='icon' icon={<Icon icon='chevron.left' size={26} />} />
    </Animated.View>
  );
}
