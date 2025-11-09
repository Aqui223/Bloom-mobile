import mergeAndSort from "@api/lib/utils/mergeAndSort";
import getChatMessagesFromStorage from "../getChatMessagesFromStorage";

export default function (realm, mmkv, chat_id, setMessages) {
    const newMsgs = getChatMessagesFromStorage(realm, mmkv, chat_id);

    setMessages(prev => mergeAndSort(prev, newMsgs));
}