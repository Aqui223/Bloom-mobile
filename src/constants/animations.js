import {
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { normalSpring, quickSpring } from "./Easings";

export const getFadeOut = (i = 0) => {
  FadeOut.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass + i * 0.4)
    .stiffness(normalSpring.stiffness);
};

export const getFadeIn = (i = 0) => {
  FadeIn.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass + i * 0.4)
    .stiffness(normalSpring.stiffness);
};

export const getCharEnter = (i = 0) =>
  FadeInDown.springify()
    .damping(quickSpring.damping)
    .mass(quickSpring.mass + i * 0.2)
    .stiffness(quickSpring.stiffness);

export const getCharExit = (i = 0) =>
  FadeOutUp.springify()
    .damping(quickSpring.damping)
    .mass(quickSpring.mass + i * 0.2)
    .stiffness(quickSpring.stiffness);
