import { useChatList } from '@api/providers/ChatsContext'
import ChatItem from '@components/chats/chat/ChatItem'
import Header from '@components/chats/header'
import Search from '@components/chats/search'
import { EmptyModal } from '@components/ui'
import { fastSpring } from '@constants/easings'
import type { Chat } from '@interfaces'
import { LegendList } from '@legendapp/list'
import useChatsScreenStore from '@stores/chats'
import useTabBarStore from '@stores/tabBar'
import useTokenTriggerStore from '@stores/tokenTriggerStore'
import { useCallback } from 'react'
import type { ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

export default function TabChats() {
  const { headerHeight } = useChatsScreenStore()
  const { height, search } = useTabBarStore()
  const { userID } = useTokenTriggerStore()
  const { chats } = useChatList()

  const animatedViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      opacity: withSpring(search ? 0 : 1, fastSpring),
    }),
  )

  const keyExtractor = useCallback((item: Chat) => {
    return String(item?.id)
  }, [])

  const renderItem = useCallback(({ item, id }: { item: Chat; id: number }) => {
    return <ChatItem item={item} userId={id} />
  }, [])

  return (
    <>
      <Search />
      <Animated.View style={[styles.container, animatedViewStyle]}>
        <Header />
        <LegendList
          data={chats}
          style={styles.list}
          renderItem={({ item }) => renderItem({ item, id: userID })}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingTop: headerHeight,
            paddingBottom: height,
          }}
          scrollIndicatorInsets={{
            top: headerHeight,
            bottom: height,
          }}
        />
        {chats?.length === 0 ? (
          <EmptyModal text="У вас еще нет ни одного чата! Создайте свой первый чат!" icon="message" color="primary" />
        ) : null}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    flex: 1,
  },
}))
