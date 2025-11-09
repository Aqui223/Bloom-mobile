import sendMessage from "@api/lib/sendMessage";
import mergeAndSort from "@api/lib/utils/mergeAndSort";
import getReplyToMessageFromStorage from "../getReplyToMessageFromStorage";

export default function (realm, mmkv, ws, content, reply_to, messages, setMessages, chat_id) {
    try {
        // send message socket
        sendMessage(content, reply_to, chat_id, messages?.length, ws).catch(console.log);

        let _reply_to;
        if (reply_to) {
            try {
                const reply_to_message = getReplyToMessageFromStorage(realm, reply_to)

                if (reply_to_message) {
                    _reply_to = reply_to_message
                }
            } catch { }
        }

        const reply_to_json = reply_to ? {
            id: _reply_to?.id,
            chat_id,
            content: _reply_to?.content,
            author_id: _reply_to?.author_id || _reply_to?.from_id,
            date: _reply_to?.date,
            seen: _reply_to?.seen
        } : null

        // payload
        const newMsg = {
            id: messages[messages.length - 1]?.id + 1,
            isMe: true,
            isFake: true,
            chat_id,
            content,
            author_id: parseInt(mmkv?.getString("user_id")),
            date: new Date(),
            seen: false,
            reply_to: reply_to_json
        };

        setMessages(prev => mergeAndSort(prev, [newMsg]));
    } catch (error) {
        console.log(error);
    }
}