import React, { useMemo } from "react";
import Chat from "@components/chatsScreen/chat";
import formatSentTime from "@lib/formatSentTime";

interface Member {
	id: number;
	username: string;
}

interface LastMessage {
	author_id: number;
	content: string;
	date: string;
}

interface ChatItemData {
	id: number;
	members: Member[];
	last_message?: LastMessage | null;
}

interface ChatItemProps {
	item: ChatItemData;
	userId: string | number;
	index: number;
}

export default function ChatItem({ item, userId, index }: ChatItemProps) {
	const numericUserId = typeof userId === "string" ? parseInt(userId) : userId;

	const recipient = useMemo(() => item.members.find(member => member.id !== numericUserId), [item.members, numericUserId]);

	const { lastMessage, lastMessageTime } = useMemo(() => {
		if (!item.last_message) {
			return {
				lastMessage: "Чат создан",
				lastMessageTime: "",
			};
		}

		return {
			lastMessage: item.last_message.content || "Чат создан",
			lastMessageTime: formatSentTime(item.last_message.date),
		};
	}, [item.last_message]);

	const chatData = useMemo(
		() => ({
			lastMessage,
			lastMessageTime,
			recipient,
			id: item.id,
			avatar: "https://i.pinimg.com/736x/e9/83/3b/e9833b429842c971097ab6e9ad3bf6ca.jpg",
			unreadCount: 0,
		}),
		[item.id, lastMessage, lastMessageTime, recipient]
	);

	return <Chat chat={chatData} index={index} />;
}
