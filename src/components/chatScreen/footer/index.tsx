import { TextInput } from "react-native";
import { styles } from "./Footer.styles";
import { useInsets } from "@hooks";
import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";
import { useState } from "react";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { layoutAnimationSpringy } from "@constants/animations";
import { Button } from "@components/ui";
import { zoomAnimationIn, zoomAnimationOut } from "@constants/animations";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { easeGradient } from 'react-native-easing-gradient'

const { colors, locations } = easeGradient({
    colorStops: {
      1: { color: "rgba(0,0,0,0.99)" },
      0: { color: "transparent" },
      0.5: { color: "black" },
    },
  });

type FooterProps = {
  onSend?: (value: string) => void;
  onLayout?: (value: number) => void;
};

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function Footer({ onSend, onLayout }: FooterProps) {
  const insets = useInsets();
  const { theme } = useUnistyles();
  const { progress } = useReanimatedKeyboardAnimation();
  const [value, setValue] = useState<string>("");

  const hasValue: boolean = value.trim() !== "";

  const handleSend = () => {
    if (hasValue) {
      onSend(value.trim());
      setValue("");
    }
  };

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      paddingBottom: interpolate(progress.value, [0, 1], [insets.bottom, theme.spacing.lg], "clamp"),
    };
  });

  return (
    <Animated.View onLayout={(e) => onLayout(e.nativeEvent.layout.height)} style={[styles.footer, animatedViewStyles]} layout={layoutAnimationSpringy}>
      <MaskedView
        style={styles.blur}
        maskElement={
          <LinearGradient
            style={styles.blur}
            locations={locations as any}
            colors={colors as any}
          />
        }
      >
        <BlurView style={styles.blur} intensity={20} tint='systemChromeMaterialDark' />
      </MaskedView>
       <LinearGradient
            colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 1)"]}
            style={styles.blur}
          />
      {!hasValue && (
        <>
          <AnimatedButton style={styles.button(false)} exiting={zoomAnimationOut} entering={zoomAnimationIn} variant='icon'>
            <BlurView style={styles.blur} intensity={40} tint='systemChromeMaterialDark' />
            <Icon icon='image' size={24} color={theme.colors.text} />
          </AnimatedButton>
          <AnimatedButton style={styles.button(false)} exiting={zoomAnimationOut} entering={zoomAnimationIn} variant='icon'>
            <BlurView style={styles.blur} intensity={40} tint='systemChromeMaterialDark' />
            <Icon icon='face.smile' size={24} color={theme.colors.text} />
          </AnimatedButton>
        </>
      )}

      <Animated.View style={styles.inputWrapper} layout={layoutAnimationSpringy}>
        <BlurView style={styles.blur} intensity={40} tint='systemChromeMaterialDark' />
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          numberOfLines={4}
          keyboardAppearance='dark'
          multiline
          submitBehavior='newline'
          cursorColor={theme.colors.secondaryText}
          selectionColor={theme.colors.secondaryText}
          returnKeyType='previous'
          value={value}
          placeholderTextColor={theme.colors.secondaryText}
          placeholder='Cообщение...'
        />
        {hasValue ? (
          <AnimatedButton layout={layoutAnimationSpringy} style={styles.button(true)} key='smile' exiting={zoomAnimationOut} entering={zoomAnimationIn} variant='icon'>
            <Icon icon='face.smile' size={24} color={theme.colors.text} />
          </AnimatedButton>
        ) : (
          <AnimatedButton layout={layoutAnimationSpringy} style={styles.button(true)} key='waveform' exiting={zoomAnimationOut} entering={zoomAnimationIn} variant='icon'>
            <Icon icon='waveform' size={24} color={theme.colors.text} />
          </AnimatedButton>
        )}
      </Animated.View>

      {hasValue && (
        <AnimatedButton
          exiting={zoomAnimationOut}
          layout={layoutAnimationSpringy}
          entering={zoomAnimationIn}
          onPress={handleSend}
          style={{ backgroundColor: theme.colors.primary }}
          variant='icon'
        >
          <Icon icon='paperplane' size={24} color={theme.colors.white} />
        </AnimatedButton>
      )}
    </Animated.View>
  );
}
