import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import type { SettingsItem as SettingsItemType } from "@interfaces";
import SettingsIcon from "../settingsIcon";
import Icon from "../../Icon";
import { styles } from "./SettingsItem.styles";

interface SettingsItemProps {
  item: SettingsItemType;
}

export default function SettingsItem({ item }: SettingsItemProps): React.JSX.Element {
  const { theme } = useUnistyles();

  const iconColor = theme.colors[item.color] ?? theme.colors.primary;

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      {item.type !== "button" && <SettingsIcon icon={item.icon} type={item.iconType} color={iconColor} />}

      <Text style={styles.label(item.type === "button", item.color)}>{item.label}</Text>

      {item.type !== "button" && (
        <View style={styles.rightSide}>
          {item.badgeLabel && <Text style={styles.badgeLabel}>{item.badgeLabel}</Text>}
          <Icon
            icon={item.badgeIcon ?? "chevron.right"}
            size={item.badgeIcon ? 24 : 20}
            color={theme.colors.secondaryText}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
