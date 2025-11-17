import { Button } from "@components/ui";
import { Icon, Separator } from "@components/ui";
import React from "react";
import { Image, Platform, View } from "react-native";
import { styles } from "./Actions.styles";
import { useUnistyles } from "react-native-unistyles";

export default function AuthActions(): React.JSX.Element {
  const { theme } = useUnistyles();

  const iOS = Platform.OS === "ios";

  const focusedIcon = (value: boolean, light?: boolean) =>
    value ? (
      <Icon size={28} icon='apple.logo' color={light ? theme.colors.text : theme.colors.background} />
    ) : (
      <Image style={styles.imageIcon} source={require("@assets/logos/google.webp")} />
    );

  return (
    <View style={styles.actionsContainer}>
      <Button
        style={styles.button(true)}
        labelStyle={styles.buttonLabel(true)}
        icon={focusedIcon(iOS)}
        label={iOS ? "Продолжить с Apple" : "Продолжить с Google"}
        size='xl'
        variant='textIcon'
      />

      <Separator label='ИЛИ' style={styles.separatorContainer} />
      <Button
        labelStyle={styles.buttonLabel(false)}
        icon={focusedIcon(!iOS, true)}
        label={!iOS ? "Продолжить с Apple" : "Продолжить с Google"}
        size='xl'
        variant='textIcon'
      />
    </View>
  );
}
