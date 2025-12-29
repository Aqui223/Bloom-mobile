import { styles } from "./Header.styles";
import HeaderAvatar from "./user/Avatar";
import { useInsets } from "@hooks";
import useSettingsScreenStore from "@stores/settings";
import User from "./user";
import { LayoutChangeEvent, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import type { User as UserType } from "@interfaces";

type HeaderProps = {
    scrollY: SharedValue<number>;
    user: UserType;
}

export default function Header({ scrollY, user }: HeaderProps): React.JSX.Element {
  const insets = useInsets();
  const { setSnapEndPosition } = useSettingsScreenStore();

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setSnapEndPosition(event.nativeEvent.layout.height - insets.top)
  };

  return (
    <View onLayout={onHeaderLayout} style={styles.header(insets.top)}>
        <HeaderAvatar user={user} scrollY={scrollY} />
        <User scrollY={scrollY} user={user}/>
    </View>
  );
}
