import { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useChatList } from "@api/providers/ChatsContext";
import { useWebSocket } from "@api/providers/WebSocketContext";
import { ROUTES } from "@constants/routes";
import useTokenTriggerStore from "@stores/tokenTriggerStore";
import type { ChatView } from "@interfaces";
import useChatsStore from "@stores/chats";
import { Haptics } from "react-native-nitro-haptics";
import { AnimatedStyle, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { ViewStyle } from "react-native";
import { quickSpring } from "@constants/easings";

type CreateChatResponse = {
  chat?: {
    id: string;
  };
};

type useChatItem = {
  selected: boolean;
  edit: boolean;
  pinned: boolean;
  animatedIconStyle: AnimatedStyle<ViewStyle>;
  animatedTextStyle: AnimatedStyle<ViewStyle>;
  openChat: () => void;
  pin: () => void;
  select: () => void;
};

export default function useChatNavigation(chat: ChatView): useChatItem {
  const navigation = useNavigation();
  const chats = useChatList();
  const ws = useWebSocket();
  const { userID } = useTokenTriggerStore();
  const { edit, selectedChats, toggleChat } = useChatsStore();

  const recipient = chat?.recipient;
  const targetId = recipient?.id || chat?.id;

  const pinned = useMemo(() => true, []);

  const selected = useMemo(() => selectedChats.includes(chat.id), [selectedChats]);

  const animatedIconStyle = useAnimatedStyle((): ViewStyle => ({
    opacity: withSpring(edit ? 0 : 1, quickSpring),
    transform: [{ translateX: withSpring(edit ? "-100%" : "0%", quickSpring)}]
  }))

  const animatedTextStyle = useAnimatedStyle((): ViewStyle => ({
    transform: [{ translateX: withSpring(edit ? 20 : 0, quickSpring)}]
  }))

  const openChat = useCallback(() => {
    const existingChat = chats?.find(
      (c) => c?.members?.some((m) => m?.id === userID) && c?.members?.some((m) => m?.id === targetId)
    );

    if (existingChat) {
      // @ts-ignore
      navigation.navigate(ROUTES.chat, {
        chat: { ...chat, id: existingChat.id },
      });
      return;
    }

    ws.send(JSON.stringify({ type: "create_chat", recipient: targetId }));

    const handleMessage = (event: MessageEvent<string>) => {
      const message: CreateChatResponse = JSON.parse(event.data);
      if (message?.chat) {
        ws.removeEventListener("message", handleMessage);
        // @ts-ignore
        navigation.navigate(ROUTES.chat, {
          chat: { ...chat, id: message.chat.id },
        });
      }
    };

    ws.addEventListener("message", handleMessage);
  }, [chats, userID, targetId, chat, navigation, ws]);

  const pin = useCallback(() => {}, []);

  const select = () => {
    Haptics.impact("light");
    toggleChat(chat.id);
  };

  return { selected, edit, pinned, animatedIconStyle, animatedTextStyle, openChat, pin, select };
}
