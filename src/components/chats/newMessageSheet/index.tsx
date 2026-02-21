import { API_URL } from '@constants/api'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, useBottomSheetScrollableCreator } from '@gorhom/bottom-sheet'
import type { User } from '@interfaces'
import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import { type Ref, useCallback, useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import Chat from '../chat'
import { styles } from './NewMessageSheet.styles'

interface NewMessageSheetProps {
  ref: Ref<BottomSheetModal>
}

export default function NewMessageSheet({ ref }: NewMessageSheetProps) {
  const BottomSheetScrollable = useBottomSheetScrollableCreator()
  const { height: screenHeight } = useWindowDimensions()
  const [users, setUsers] = useState<User[]>()
  const [loadingUsers, setLoadingUsers] = useState(false)

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />, [])

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
    <BottomSheetModal
      snapPoints={[screenHeight]}
      enableDynamicSizing={false}
      enablePanDownToClose
      backgroundStyle={styles.sheet}
      backdropComponent={renderBackdrop}
      ref={ref}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <FlashList
          style={{ flex: 1 }}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          maintainVisibleContentPosition={{ disabled: true }}
          data={users}
          renderScrollComponent={BottomSheetScrollable}
        />
      </BottomSheetView>
    </BottomSheetModal>
  )
}
