import { useWindowDimensions, View } from "react-native";
import { styles } from "./header.styles";
import { useInsets } from "@hooks";
import { useState, useEffect } from "react";
import { Icon, Button } from "@components/ui";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import useChatsScreenStore from "@stores/ChatsScreen";
import Title from "./Title";
import { useWebSocket } from "@api/providers/WebSocketContext";
import { GradientBlur } from "@components/ui";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { BlurView } from "expo-blur";
import { quickSpring } from "@constants/easings";
import { layoutAnimationSpringy } from "@constants/animations";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Header() {
  const ws = useWebSocket();
  const insets = useInsets();
  const { theme } = useUnistyles();
  const {width} = useWindowDimensions();
  const progress = useSharedValue(0);
  const [status, setStatus] = useState("connecting");

  const { setHeaderHeight, setFocused, focused } = useChatsScreenStore();

  const innerHeaderWidth = width - (theme.spacing.lg * 2)

  const animatedViewStyles  = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [88 + 12, innerHeaderWidth]),
    backgroundColor: interpolateColor(progress.value, [0, 1], [theme.colors.foregroundBlur, 'transparent'])
  }))
  
  useEffect(() => {
    if (ws) {
      ws.onopen = () => setStatus("connected");
      ws.onclose = () => setStatus("connecting");
    }
  }, [ws]);

  useEffect(() => {
      progress.value = withSpring(focused ? 1 : 0, quickSpring)
  }, [focused])

  return (
    <View
      onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      style={[styles.header, { paddingTop: insets.top }]}
    >
      <GradientBlur direction='top-to-bottom' />
      <View style={[styles.topHeader]}>
        <Button blur variant='icon'>
          <BlurView style={StyleSheet.absoluteFill} intensity={40} tint='systemChromeMaterialDark' />
          <Icon icon='pencil' color={theme.colors.text} />
        </Button>
        <Title state={status} />
        <View style={styles.inView}/>
        <Animated.View layout={layoutAnimationSpringy} style={[styles.buttonsWrapper, animatedViewStyles]}>
          <AnimatedBlurView layout={layoutAnimationSpringy} style={StyleSheet.absoluteFill} intensity={40} tint='systemChromeMaterialDark' />
          <Button onPress={() => setFocused(!focused)} style={styles.button} variant='icon'>
            <Icon icon='magnifyingglass' color={theme.colors.text} />
          </Button>
          <Button style={styles.button} variant='icon'>
            <Icon icon='message' color={theme.colors.text} />
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}
