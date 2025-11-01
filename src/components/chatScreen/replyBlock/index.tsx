import { Button, Icon } from "@components/ui";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "./replyBlock.styles";
import { getFadeIn, getFadeOut, layoutAnimationSpringy } from "@constants/animations";
import { useUnistyles } from "react-native-unistyles";
import getChatFromStorage from "@lib/getChatFromStorage";
import { createSecureStorage } from "@lib/Storage";

type Message = {
  author_id: number;
  chat_id: number;
  content: string,
  date: Date,
  id: number,
  isMe: boolean,
  seen?: Date
};

type ReplyBlockProps = {
  message: Message;
  onCancel?: () => void;
};

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function ReplyBlock({ message, onCancel }: ReplyBlockProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const storage = await createSecureStorage("user-storage")
      const chat = await getChatFromStorage(message?.chat_id);
      const username = message?.isMe ?
        JSON.parse(storage.getString("user"))?.username :
        chat?.keys?.recipient?.username;
      setUsername(username || "anon")
    })()
  }, [message])

  return (
    message && (
      <View style={styles.replyWrapper}>
        <Animated.View
          exiting={getFadeOut()}
          entering={getFadeIn()}
          layout={layoutAnimationSpringy}
          style={styles.replyChild}
        >
          <View style={styles.replyTo}>
            <Text style={styles.replyToName} numberOfLines={1}>В ответ {username}</Text>
            <Text style={styles.replyToMessage} numberOfLines={1}>{message?.content}</Text>
          </View>
          {onCancel && (
            <AnimatedButton
              onPress={() => onCancel()}
              layout={layoutAnimationSpringy}
              variant='icon'
              style={styles.button}
            >
              <Icon color={theme.colors.secondaryText} icon='star' />
            </AnimatedButton>
          )}
        </Animated.View>
      </View>
    )
  );
}
