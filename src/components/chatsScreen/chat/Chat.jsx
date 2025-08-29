import { View, Text } from "react-native";
import { styles } from "./Chat.styles";
import FastImage from "@d11/react-native-fast-image";

import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";

export default function Chat({ chat }) {
  const { theme } = useUnistyles();
  return (
    <View style={styles.chat}>
      <View style={styles.avatarWrapper}>
        <FastImage style={styles.avatar} source={{ uri: chat.avatar }} />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{chat.name}</Text>
            {chat.unreadCount > 0 && <View style={styles.unreadMark} />}
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.time}>{chat.lastMessageTime}</Text>
            <Icon
              icon="chevron.right"
              size={17}
              color={theme.colors.secondaryText}
            />
          </View>
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {chat.lastMessage}
        </Text>
      </View>
    </View>
  );
}
