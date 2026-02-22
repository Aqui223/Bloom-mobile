import { createSecureStorage } from '@lib/storage'

export default async function (chat_id, new_key) {
  const storage = await createSecureStorage('user-storage')

  let chats
  try {
    chats = JSON.parse(storage.getString('chats'))
  } catch {
    chats = []
  }

  chats = chats.map((chat) => {
    return {
      id: chat?.id,
      key: chat?.id === chat_id ? new_key : chat?.key,
    }
  })

  // set new chats
  storage.set('chats', JSON.stringify(chats))

  return chats
}
