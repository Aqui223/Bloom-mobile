import mergeAndSort from "@api/lib/utils/mergeAndSort";
import filterMessagesByChatId from "../filterMessagesByChatId";

export default function (mmkv, setMessages, newMessages, chat_id, messages, clearNewMessages) {
    try {
        if (!newMessages?.length) return;

        // filter messages by current chat_id
        const filtered = filterMessagesByChatId(mmkv, chat_id, newMessages);

        if (filtered.length > 0) {
            const newFilteredMessages = filtered.map(newMessage => {
                const isMessageAlreadyExists = messages.find(message => message?.nonce === newMessage?.nonce);
                const { raw, ...message } = newMessage;

                if (isMessageAlreadyExists) {
                    return { ...isMessageAlreadyExists, ...message, isFake: false, nonce: raw?.nonce };
                }

                return { ...message, nonce: raw?.nonce };
            })
            
            setMessages(prev => mergeAndSort(prev, newFilteredMessages));
        }

        // clear context messages history
        clearNewMessages(chat_id);
    } catch { }

}