import { Icon } from "@components/ui";
import { Text } from "react-native";
import Animated, {
} from "react-native-reanimated";
import { getCharEnter, getCharExit,} from "@constants/animations";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./header.styles";
import SpinnerLoader from "@components/ui/loader";

export default function Title({ state }) {
  const { theme } = useUnistyles();

  return state !== "connecting" ? (
    <Animated.View key="connected" style={styles.container} entering={getCharEnter()} exiting={getCharExit()}>
      <Icon icon='lightbolt' color={theme.colors.primary} size={24} />
      <Text style={styles.text(false)}>
        Bloom
      </Text>
    </Animated.View>
  ) : (
    <Animated.View key="connecting" style={styles.container} entering={getCharEnter()} exiting={getCharExit()}>
      <SpinnerLoader size={24} color={theme.colors.yellow} />
      <Text style={styles.text(true)}>
        Подкл.
      </Text>
    </Animated.View>
  );
}
