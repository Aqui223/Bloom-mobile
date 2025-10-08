import { View, Text, Pressable } from "react-native";
import { styles } from "./Chat.styles";
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from "react-native-reanimated";
import Icon from "@components/ui/Icon";
import { useUnistyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { quickSpring } from "@constants/Easings";
import { ROUTES } from "@constants/Routes";
import { getFadeOut, getFadeIn, getCharEnter, getCharExit } from "@constants/animations";
import { useChatList } from "@providers/ChatsContext";
import { useWebSocket } from "@providers/WebSocketContext";
import { Avatar } from "@components/ui";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const textAnimation = {
	entering: FadeInDown.springify().mass(quickSpring.mass).damping(quickSpring.damping).stiffness(quickSpring.stiffness),
	exiting: FadeOutUp.springify().mass(quickSpring.mass).damping(quickSpring.damping).stiffness(quickSpring.stiffness),
};

export default function Chat({ chat, index }) {
	const { theme } = useUnistyles();
	const navigation = useNavigation();

	const chats = useChatList();

	const ws = useWebSocket();

	return (
		<AnimatedPressable
			key={`chat-${index}`}
			exiting={getFadeOut(index)}
			entering={getFadeIn(index)}
			onPress={() => {
				if (!chats.find(_chat => _chat?.id === chat?.id)) {
					ws.send(
						JSON.stringify({
							type: "create_chat",
							recipient: chat?.id,
						})
					);
				}

				navigation.navigate(ROUTES.CHAT, { chat });
			}}
			style={styles.chat}
		>
			<View style={styles.avatarWrapper}>
				<Avatar size='lg' username={chat?.recipient?.username} />
			</View>
			<View style={styles.content}>
				<View style={styles.headerRow}>
					<View style={styles.nameWrapper}>
						<Text style={styles.name}>{chat?.recipient?.username}</Text>
						{chat?.unreadCount > 0 && <View style={styles.unreadMark} />}
					</View>
					<View style={styles.metaRow}>
            <View style={styles.charStack}>
               {chat?.lastMessageTime.split("").map((char, i) => (
                        <Animated.Text
                          key={`${char}-${i}`}
                          style={styles.secondary}
                          entering={getCharEnter(i)}
                          exiting={getCharExit(i)}
                          layout={LinearTransition.springify()
                            .mass(quickSpring.mass)
                            .damping(quickSpring.damping)
                            .stiffness(quickSpring.stiffness)}
                        >
                          {char}
                        </Animated.Text>
                      ))}
            </View>
						<Icon icon='chevron.right' size={17} color={theme.colors.secondaryText} />
					</View>
				</View>
				<Animated.Text
					entering={textAnimation.entering}
					exiting={textAnimation.exiting}
					key={chat?.lastMessage}
					style={styles.secondary}
					numberOfLines={2}
				>
					{chat?.lastMessage}
				</Animated.Text>
			</View>
		</AnimatedPressable>
	);
}
