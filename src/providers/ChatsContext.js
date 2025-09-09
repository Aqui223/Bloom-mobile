import { useState, useEffect, useContext, createContext } from "react";
import { useWebSocket } from "./WebSocketContext";
import { getChats } from "@lib/api";
import setChatKeysToStorage from "@lib/setChatKeysToStorage";
import generateKeys from "@lib/skid/generateKeys";
import { createSecureStorage } from "@lib/Storage";

const ChatsContext = createContext(null);

export default function ChatsProvider({ children }) {
    const [chats, setChats] = useState([]);
    const ws = useWebSocket();

    useEffect(() => {
        if (ws) {
            (async () => {
                const _chats = await getChats(ws);
                if (_chats) setChats(_chats);
            })()

            ws.onmessage = async (msg) => {
                const Storage = await createSecureStorage("user-storage");

                let message;
                try {
                    message = JSON.parse(msg?.data);
                } catch (error) {
                    console.log(error);
                    return;
                }

                if (message?.type === "keys_added") {
                    await setChatKeysToStorage(message?.chat_id, {
                        kyberPublicKey: message?.kyberPublicKey,
                        ecdhPublicKey: message?.ecdhPublicKey,
                        edPublicKey: message?.edPublicKey
                    });
                } else if (message?.chat) {
                    let _chats;
                    try {
                        _chats = JSON.parse(Storage.getString("chats"))
                    } catch {
                        _chats = []
                    }

                    const myKeys = generateKeys();

                    ws.send(JSON.stringify({
                        type: "add_keys",
                        chat_id: message?.chat?.id,
                        kyberPublicKey: myKeys.kyberPublicKey,
                        ecdhPublicKey: myKeys.ecdhPublicKey,
                        edPublicKey: myKeys.edPublicKey
                    }))

                    _chats = [..._chats, {
                        id: message?.chat?.id,
                        keys: {
                            my: { ...myKeys },
                            recipient: {}
                        }
                    }]

                    Storage.set("chats", JSON.stringify(_chats));

                    setChats(prev => [...prev, message?.chat])
                }
            }
        }
    }, [ws]);

    return (
        <ChatsContext.Provider value={chats}>
            {children}
        </ChatsContext.Provider>
    );
};

export const useChatList = () => useContext(ChatsContext);