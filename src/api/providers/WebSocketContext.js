import { WEBSOCKET_URL } from '@constants/api'
import { useSession } from '@providers/SessionProvider'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

const WebSocketContext = createContext(null)

export function WebSocketProvider({ children }) {
  const { token } = useSession()

  const [socket, setSocket] = useState(null)

  const reconnectTimeout = useRef(null)
  const appState = useRef(AppState.currentState)

  const connect = (jwt) => {
    if (!jwt) return

    setSocket((prev) => {
      prev?.close()
      return null
    })

    const ws = new WebSocket(WEBSOCKET_URL + jwt)

    ws.onopen = () => {
      setSocket(ws)
    }

    ws.onclose = () => {
      setSocket(null)

      if (!reconnectTimeout.current && appState.current === 'active') {
        reconnectTimeout.current = setTimeout(() => {
          reconnectTimeout.current = null
          connect(jwt)
        }, 3000)
      }
    }

    ws.onerror = () => {
      ws.close()
    }
  }

  useEffect(() => {
    if (!token) {
      setSocket((prev) => {
        prev?.close()
        return null
      })
      return
    }

    connect(token)

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current)
        reconnectTimeout.current = null
      }
    }
  }, [token])

  // app state
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current === 'active' && next.match(/inactive|background/)) {
        setSocket((prev) => {
          prev?.close()
          return null
        })
      }

      if (appState.current.match(/inactive|background/) && next === 'active' && token) {
        connect(token)
      }

      appState.current = next
    })

    return () => sub.remove()
  }, [token])

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>
}

export function useWebSocket() {
  return useContext(WebSocketContext)
}
