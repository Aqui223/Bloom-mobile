import { View, Text, Pressable } from "react-native";
import { styles } from "./Chat.styles";
import FastImage from "@d11/react-native-fast-image";
import Animated from "react-native-reanimated";
import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";

import { ROUTES } from "@constants/Routes";
import { getFadeOut, getFadeIn } from "@constants/animations";
import { useChatList } from "@providers/ChatsContext";
import { useWebSocket } from "@providers/WebSocketContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Chat({ chat, isSearch, index }) {
  const { theme } = useUnistyles();
  const navigation = useNavigation();

  const chats = useChatList();

  const ws = useWebSocket()

  return (
    <AnimatedPressable
      key={`chat-${index}`}
      exiting={getFadeOut(index)}
      entering={getFadeIn(index)}
      onPress={() => {
        if (!chats.find(_chat => _chat?.id === chat?.id)) {
          ws.send(JSON.stringify({
            type: "create_chat",
            recipient: chat?.id
          }))
        }

        navigation.navigate(ROUTES.CHAT, { chat })
      }}
      style={styles.chat}
    >
      <View style={styles.avatarWrapper}>
        <FastImage
          style={[
            styles.avatar,
            { width: isSearch ? 44 : 56, height: isSearch ? 44 : 56 },
          ]}
          source={{ uri: chat?.avatar }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{chat?.recipient?.username}</Text>
            {chat?.unreadCount > 0 && <View style={styles.unreadMark} />}
          </View>
          {isSearch ? null : (
            <View style={styles.metaRow}>
              <Text style={styles.time}>{chat?.lastMessageTime}</Text>
              <Icon
                icon="chevron.right"
                size={17}
                color={theme.colors.secondaryText}
              />
            </View>
          )}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {isSearch ? chat?.username : chat?.lastMessage}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
