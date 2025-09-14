import { useState, useEffect } from "react";
import { useWebSocket } from "@providers/WebSocketContext";
import { useMessagesList } from "@providers/MessagesContext";
import sendMessage from "@lib/sendMessage";
import { createSecureStorage } from "@lib/Storage";
import initRealm from "@lib/initRealm";
import Realm from "realm";

function uniqueById(arr) {
    const seen = new Set();
    return arr.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
    });
}

export default function useChatMessages(chat_id) {
    const [messages, setMessages] = useState([]);
    const newMessages = useMessagesList();
    const ws = useWebSocket();

    const addMessage = async (content) => {
        try {
            const storage = await createSecureStorage("user-storage");
            await sendMessage(content, chat_id, messages?.length, ws).catch(console.log);

            const newMsg = {
                id: String(Date.now()),
                isMe: true,
                chat_id,
                content,
                author_id: parseInt(storage?.getString("user_id")),
                date: new Date(),
                seen: false
            };

            setMessages(prev => [...prev, newMsg]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            const storage = await createSecureStorage("user-storage");
            const realm = await initRealm();

            const realmMessages = realm.objects("Message").filtered("chat_id == $0", chat_id);

            setMessages(prev => [
                ...prev,
                ...realmMessages
                    .map(message => ({
                        ...message,
                        isMe: message.author_id === parseInt(storage.getString("user_id"))
                    }))
                    .filter(m => !prev.some(pm => pm.id === m.id))
            ]);
        })();
    }, [chat_id]);

    useEffect(() => {
        if (!newMessages?.messages?.length) return;

        (async () => {
            const storage = await createSecureStorage("user-storage");

            const filtered = newMessages.messages
                .filter(m => m.chat_id === chat_id)
                .map(m => ({
                    ...m,
                    isMe: m.from_id === parseInt(storage.getString("user_id")),
                }));

            if (filtered.length > 0) {
                setMessages(prev => [...prev, ...filtered]);
            }

            newMessages.clear();
        })();
    }, [newMessages, chat_id, messages]);

    return { messages: uniqueById(messages), addMessage };
}
