import Header from "@components/chatScreen/header";
import Footer from "@components/chatScreen/footer";
import Message from "@components/chatScreen/message";
import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./Chat.styles";
import { ScrollViewProps, View } from "react-native";
import EmptyModal from "@components/chatScreen/emptyModal";
import { KeyboardAvoidingView, useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import useMessages from "@api/hooks/encryption/useMessages";
import type { Chat, Message as MessageType } from "@interfaces";
import { useScreenScale } from "@hooks";
import { FlashList } from "@shopify/flash-list";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { useAnimatedProps } from "react-native-reanimated";

interface ChatScreenProps {
	route: {
		params: Object;
	};
}

export default function ChatScreen({ route }: ChatScreenProps): React.JSX.Element {
	const { chat } = route.params as { chat: Chat };

	const { messages, addMessage } = useMessages(chat?.id);
	const [seenId, setSeenId] = useState<number>(0);
	const [footerHeight, setFooterHeight] = useState<number>(0);
	const [headerHeight, setHeaderHeight] = useState<number>(0);
	const [lastMessageId, setLastMessageId] = useState<number>(0);
	const { animatedScreenStyle } = useScreenScale();
	const { height } = useReanimatedKeyboardAnimation()

	useEffect(() => {
		let lastSeen = 0;
		for (let i = messages.length - 1; i >= 0; i--) {
			const m = messages[i];
			if (m?.seen && m?.isMe) {
				lastSeen = m.id;
				break;
			}
		}
		setSeenId(lastSeen);
		setLastMessageId(messages.length ? messages[messages.length - 1]?.id : 0);
	}, [messages.length, messages]);

	const renderItem = useCallback(
		({ item }: { item: MessageType }) => {
			return (
				<Message
					key={item?.nonce}
					seen={seenId === item?.id}
					isLast={lastMessageId === item?.id}
					message={item}
				/>
			);
		},
		[seenId, lastMessageId, footerHeight]
	);

	const keyExtractor = useCallback((item: MessageType) => {
		return String(item.nonce);
	}, []);

	const a = useAnimatedProps((): ScrollViewProps => ({
		contentInset: {bottom: -height.get() + footerHeight, top: headerHeight + 16 },
		scrollIndicatorInsets: { top: headerHeight, bottom: -height.get() + footerHeight}
	}))

	return (
		<View style={[styles.container, animatedScreenStyle]}>
			<Header onLayout={setHeaderHeight} chat={chat} />
			<EmptyModal chat={chat} visible={messages.length === 0} />
				<AnimatedLegendList
					data={messages}
					renderItem={renderItem}
					alignItemsAtEnd
					keyExtractor={keyExtractor}
					contentContainerStyle={[styles.listContent]}
					style={styles.list}
					animatedProps={a}
					maintainScrollAtEnd
					keyboardDismissMode="interactive"
					maintainVisibleContentPosition
					showsVerticalScrollIndicator={true}
					automaticallyAdjustsScrollIndicatorInsets={false}
				/>
				<Footer setFooterHeight={setFooterHeight} footerHeight={footerHeight} onSend={addMessage} />
		</View>
	);
}
