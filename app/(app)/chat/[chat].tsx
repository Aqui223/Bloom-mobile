import EmptyModal from '@components/chatScreen/emptyModal'
import Footer from '@components/chatScreen/footer'
import Header from '@components/chatScreen/header'
import Message from '@components/chatScreen/message'
import { useChatController, useChatKeyboard, useInsets } from '@hooks'
import type { Message as MessageType } from '@interfaces'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, Platform, View } from 'react-native'
import { KeyboardStickyView } from 'react-native-keyboard-controller'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

export default function Chat() {
  const { chat } = useLocalSearchParams<{ chat: string }>()

  const { messages, seenID, addMessage, _chat } = useChatController(chat)
  const [footerHeight, setFooterHeight] = useState<number>(0)
  const insets = useInsets()
  const { theme } = useUnistyles()
  const { height } = useChatKeyboard()

  const headerHeight = insets.top + 44 + theme.spacing.md
  const endPadding = theme.spacing.lg + theme.spacing.xl + theme.spacing.md

  const renderItem = useCallback(
    ({ item }: { item: MessageType }) => {
      const grouped = !item?.groupEnd && !item?.groupStart

      const paddingBottom = grouped ? theme.spacing.sm : item?.groupEnd ? endPadding : theme.spacing.lg

      return <Message seen={seenID === item?.id} message={item} paddingBottom={paddingBottom} groupEnd={item?.groupEnd} />
    },
    [seenID, endPadding],
  )

  const keyExtractor = useCallback((item: MessageType, index: number) => {
    return String(item.id ?? item.nonce)
  }, [])

  return (
    <View style={styles.container}>
      <Header chat={_chat} />
      <EmptyModal chat={_chat} visible={messages.length === 0} />
      <KeyboardStickyView style={styles.list}>
        <FlatList
          data={messages}
          ListFooterComponent={<View style={{ height: height, width: '100%', backgroundColor: 'red' }} />}
          renderItem={renderItem}
          extraData={messages}
          removeClippedSubviews={Platform.OS === 'ios'}
          inverted
          scrollToOverflowEnabled
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent(headerHeight, footerHeight)}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />
      </KeyboardStickyView>
      <Footer setFooterHeight={setFooterHeight} footerHeight={footerHeight} onSend={addMessage} />
    </View>
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
  listContent: (paddingBottom: number, paddingTop: number) => ({
    paddingHorizontal: theme.spacing.lg,
    paddingBottom,
    paddingTop: paddingTop + theme.spacing.md,
  }),
}))
