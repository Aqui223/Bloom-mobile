export default function (newSeenMessages, chat_id, setMessages, clearNewSeenMessages) {
  if (!newSeenMessages.length) return

  // filter seen messages ids by current chat_id
  const filtered = newSeenMessages.filter((m) => m?.chat_id === chat_id)

  if (filtered?.length > 0) {
    setMessages((prev) =>
      prev.map((m) => {
        // change only that messages that is in filtered list
        if (filtered?.find((_m) => _m?.id === m?.id)) {
          return { ...m, seen: m?.date }
        }
        return m
      }),
    )
  }

  clearNewSeenMessages(chat_id)
}
