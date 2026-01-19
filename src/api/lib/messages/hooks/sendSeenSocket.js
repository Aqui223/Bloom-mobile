import { Q } from '@nozbe/watermelondb'
import { database } from 'src/db'

export default async function (ws, chat_id, messages, setMessages) {
  try {
    const lastMessage = messages[messages?.length - 1]

    // if message not seen and message sent by recipient
    if (!lastMessage?.seen && !lastMessage?.isMe) {
      // send seen socket
      ws.send(
        JSON.stringify({
          type: 'message_seen',
          chat_id,
          messages: [lastMessage?.id],
        }),
      )

      // change seen status in local storage
      await database.write(async () => {
        const collection = await database.get('messages')

        const msgs = await collection.query(Q.where('server_id', lastUnseenMessage?.id)).fetch()
        const msg = msgs[0]
        if (msg)
          await msg.update((m) => {
            m.seen = new Date()
          })
      })

      setMessages((prev) =>
        prev?.map((message) => {
          // change only last message status
          if (message?.id === lastMessage?.id) {
            return { ...message, seen: new Date() }
          }
          return message
        }),
      )
    }

    // get last unseen message from local storage
    const lastUnseenMessage = [...messages].reverse().find((m) => !m.seen && !m.isMe)
    if (!lastUnseenMessage) return

    // send seen socket for last unseen message
    ws.send(
      JSON.stringify({
        type: 'message_seen',
        chat_id,
        messages: [lastUnseenMessage?.id],
      }),
    )

    // change last unseen message status in local storage
    await database.write(async () => {
      const collection = await database.get('messages')

      const msgs = await collection.query(Q.where('server_id', lastUnseenMessage?.id)).fetch()
      const msg = msgs[0]
      if (msg)
        await msg.update((m) => {
          m.seen = new Date()
        })
    })

    setMessages((prev) =>
      prev?.map((message) => {
        // change only last unseen message status
        if (message?.id === lastUnseenMessage?.id) {
          return { ...message, seen: new Date() }
        }
        return message
      }),
    )
  } catch {}
}
