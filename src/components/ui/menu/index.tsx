import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { normalSpring, quickSpring } from "@constants/easings";
import { Haptics } from "react-native-nitro-haptics";
import { BlurView } from "expo-blur";
import { styles } from "./Menu.styles";
import Icon from "../Icon";
import { ICONS } from "@constants/icons";
import { getFadeIn, getFadeOut } from "@constants/animations";

export interface Option {
  icon: keyof typeof ICONS;
  label: string;
  action: string;
  color: string;
}

type Position = { top: number; left: number; width: number };

type MenuProps = {
  trigger?: React.ReactNode;
  options: Option[];
  onSelect?: (value?: unknown) => void;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  bluredBackdrop?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Menu({
  trigger,
  options,
  onSelect,
  onOpen,
  onClose,
  open,
  bluredBackdrop,
}: MenuProps): React.ReactNode {
  const [_open, _setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<any>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : _open;

  const close = useCallback(() => {
    if (!isControlled) _setOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  const toggle = useCallback(() => {
    if (isControlled) return;

    if (isOpen) return close();

    triggerRef.current?.measureInWindow((x: number, y: number, width: number) => {
      setPosition({ top: y, left: x + width, width });
      _setOpen(true);
      Haptics.impact("medium");
      onOpen?.();
    });
  }, [isControlled, isOpen, close, onOpen]);

  const onSelectPressed = (value: string) => {
    onSelect?.(value);
    close();
  };

  const animatedViewStyles = useAnimatedStyle(() => ({
    opacity: withSpring(isOpen ? 1 : 0, quickSpring),
    borderRadius: withSpring(isOpen ? 28 : 20, normalSpring),
    transform: [{ scale: withSpring(isOpen ? 1 : 0.25, quickSpring) }],
  }));

  const animatedPressableStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isOpen ? 0.8 : 1, quickSpring) }],
    opacity: withSpring(isOpen ? 0 : 1, quickSpring),
  }));

  return (
    <>
      {!isControlled && (
        <AnimatedPressable
          onLongPress={toggle}
          style={animatedPressableStyles}
          ref={triggerRef}
        >
          {trigger}
        </AnimatedPressable>
      )}

      <Portal>
        {isOpen && (
          <AnimatedPressable
            entering={getFadeIn()}
            exiting={getFadeOut()}
            style={styles.backdrop}
            onPress={close}
          >
            {bluredBackdrop && <BlurView style={styles.backdrop} intensity={48} tint='dark' />}
          </AnimatedPressable>
        )}

        <View style={styles.menuWrapper({ top: position.top, open: isOpen })}>
          <Animated.View style={[styles.menu, animatedViewStyles]}>
            <BlurView tint='dark' style={styles.backdrop} intensity={128} />
            {options.map((option, index) => (
              <Pressable onPress={() => onSelectPressed(option.action)} style={styles.option} key={index}>
                <Icon size={28} color={option.color} icon={option.icon} />
                <Text style={styles.optionText(option.color)}>{option.label}</Text>
              </Pressable>
            ))}
          </Animated.View>
        </View>
      </Portal>
    </>
  );
}
