import { View, Pressable } from "react-native";
import { styles } from "./Footer.styles";
import useInsets from "@hooks/UseInsets";
import Icon from "@components/ui/Icon";

export default function Footer() {
  const insets = useInsets();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
      <Pressable style={styles.button}>
        <Icon icon="dots" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.button}>
        <Icon icon="face.smile" size={24} color="black" />
      </Pressable>
    </View>
  );
}
