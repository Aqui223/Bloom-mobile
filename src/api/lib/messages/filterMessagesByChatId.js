export default function (mmkv, chat_id, messages) {
  // user id
  const userId = parseInt(mmkv.getString('user_id'), 10)

  // filter messages by current chat_id
  return messages
    .filter((m) => m.chat_id === chat_id)
    .map((m) => ({
      ...m,
      isMe: m.from_id === userId,
    }))
}
