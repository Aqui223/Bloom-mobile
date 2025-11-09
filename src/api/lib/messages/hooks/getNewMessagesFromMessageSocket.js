import mergeAndSort from "@api/lib/utils/mergeAndSort";
import filterMessagesByChatId from "../filterMessagesByChatId";

export default function (mmkv, setMessages, newMessages, chat_id, messages, clearNewMessages) {
    if (!newMessages?.length) return;

    // filter messages by current chat_id
    const filtered = filterMessagesByChatId(mmkv, chat_id, messages);

    if (filtered.length > 0) {
        setMessages(prev => mergeAndSort(prev, filtered));
    }

    // clear context messages history
    clearNewMessages();
}