import Header from "@components/chatScreen/header";
import Footer from "@components/chatScreen/footer";
import Message from "@components/chatScreen/message";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from "./Chat.styles";
import { View } from "react-native";
import EmptyModal from "@components/chatScreen/emptyModal";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import useMessages from "@api/hooks/encryption/useMessages";
import type { Chat, Message as MessageType } from "@interfaces";
import { useScreenScale } from "@hooks";
import { KeyboardAvoidingLegendList} from "@legendapp/list/keyboard"
import { LegendListRef } from "@legendapp/list";

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
	const { height: keyboardHeight, progress: keyboardProgress } = useReanimatedKeyboardAnimation();
	const listRef = useRef<LegendListRef>(null);
	
	const CHAT_TIME_WINDOW = 5 * 60 * 1000;

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
        ({ item, index }: { item: MessageType; index: number }) => {
			if (item?.type === "date_header") {
				// бейдж даты
				// жсон выглядbт так
				// {"text": "13 декабря", "type": "date_header"}
				return;
			}

            const prevItem = messages[index - 1];
            const nextItem = messages[index + 1];

            const isGroupStart = !prevItem 
                || prevItem.author_id !== item.author_id 
                || (new Date(item.date).getTime() - new Date(prevItem.date).getTime() > CHAT_TIME_WINDOW);

            const isGroupEnd = !nextItem 
                || nextItem.author_id !== item.author_id 
                || (new Date(nextItem.date).getTime() - new Date(item.date).getTime() > CHAT_TIME_WINDOW);

            return (
                <Message
                    key={item?.nonce}
                    seen={seenId === item?.id}
                    isLast={lastMessageId === item?.id}
                    message={item}
                    isGroupStart={isGroupStart}
                    isGroupEnd={isGroupEnd}
                />
            );
        },
        [seenId, lastMessageId, footerHeight, messages] 
    );

		const ss = () => {
			listRef.current?.scrollToEnd({ animated: true});
	}

	useEffect(() => {
		
		ss()
	}, [messages.length])


	// useAnimatedReaction(() => keyboardProgress.value, (current, previous) => {
	// 	if (current > 0) {
	// 		if (isUserNearBottom.get()) runOnJS(ss)(1)
	// 	}
	// })

	const keyExtractor = useCallback((item: MessageType, index: number) => {
		return String(item?.nonce ?? item?.id ?? index);

	}, []);
	return (
		<View style={[styles.container, animatedScreenStyle]}>
			<Header onLayout={setHeaderHeight} chat={chat} />
			<EmptyModal chat={chat} visible={messages.length === 0} />
				<KeyboardAvoidingLegendList
					data={messages}
					renderItem={renderItem}
					alignItemsAtEnd
					ref={listRef}
					keyExtractor={keyExtractor}
					// maintainScrollAtEnd
					style={styles.list}
					contentInset={{ bottom: footerHeight -16, top: 0}}
					contentContainerStyle={[styles.listContent]}
					keyboardDismissMode="interactive"
					showsVerticalScrollIndicator={false}
				/>
				<Footer setFooterHeight={setFooterHeight} footerHeight={footerHeight} onSend={addMessage} />
		</View>
	);
}
