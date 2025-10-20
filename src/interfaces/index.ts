export interface MessageInterface {
	isMe: boolean;
	content: string;
	date: Date;
  id: number,
}

export interface Chat {
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  id: number;
  recipient: {
    username: string;
    avatar: string
  };
}