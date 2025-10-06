import { createSecureStorage } from "@lib/Storage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import setChatKeysToStorage from "@lib/setChatKeysToStorage";
import { WEBSOCKET_URL } from "@constants/Api";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const reconnectTimeout = useRef(null);

    const connect = async () => {
        const storage = await createSecureStorage("user-storage");

        const ws = new WebSocket(WEBSOCKET_URL + storage.getString("token"));

        ws.onopen = () => {
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
                reconnectTimeout.current = null;
            }
        };

        ws.onclose = () => {
            reconnectTimeout.current = setTimeout(connect, 3000);
        };

        ws.onerror = (err) => {
            ws.close();
        };

        setSocket(ws);
    };

    useEffect(() => {
        connect();
        return () => {
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);