import mergeAndSort from '@api/lib/utils/mergeAndSort'
import getChatMessagesFromStorage from '../getChatMessagesFromStorage'

export default async function (mmkv, chat_id, setMessages) {
  const newMsgs = await getChatMessagesFromStorage(mmkv, chat_id)

  setMessages((prev) => mergeAndSort(prev, newMsgs))
}
