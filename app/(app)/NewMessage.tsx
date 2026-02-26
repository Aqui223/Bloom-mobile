import Chat from '@components/chats/chat'
import { API_URL } from '@constants/api'
import type { User } from '@interfaces'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import Transition from 'react-native-screen-transitions'
import { StyleSheet } from 'react-native-unistyles'

export default function NewMessage() {
  const [users, setUsers] = useState<User[]>()
  const [loadingUsers, setLoadingUsers] = useState(false)

  const renderItem = useCallback(({ item }) => {
    return <Chat chat={item} isSearch />
  }, [])

  const keyExtractor = useCallback((item: User) => {
    return String(item?.id)
  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    const fetchUsers = async () => {
      setLoadingUsers(true)
      try {
        const response = await axios.get<User[]>(`${API_URL}/users`, {
          signal: abortController.signal,
        })
        setUsers(response.data)
        console.log('Users loaded:', response.data[0])
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Запрос отменен (компонент размонтирован)')
        } else {
          console.error('Ошибка при загрузке пользователей:', error)
        }
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchUsers()

    return () => {
      abortController.abort()
    }
  }, [])
  return (
    <View style={styles.container}>
      <Transition.FlatList style={{ flex: 1 }} keyExtractor={keyExtractor} renderItem={renderItem} data={users} />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: (paddingBottom: number, paddingTop: number) => ({
    paddingHorizontal: theme.spacing.lg,
    paddingBottom,
    gap: theme.spacing.sm,
    paddingTop: paddingTop + theme.spacing.md,
  }),
}))
