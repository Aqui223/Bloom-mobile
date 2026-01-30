export default function (mmkv) {
  let chats
  try {
    chats = JSON.parse(mmkv.getString('chats'))
  } catch {
    chats = []
  }

  let user
  try {
    user = JSON.parse(mmkv.getString('user'))
  } catch {
    user = {}
  }

  return chats?.map((chat) => {
    return {
      id: chat?.id,
      encryption_key: chat?.key,
      members: [
        {
          id: chat?.keys?.recipient?.id,
          username: chat?.keys?.recipient?.username,
          kyber_public_key: chat?.keys?.recipient?.kyber_public_key,
          ecdh_public_key: chat?.keys?.recipient?.ecdh_public_key,
          ed_public_key: chat?.keys?.recipient?.ed_public_key,
        },
        {
          id: user?.id || 0,
          username: user?.username || '',
          kyber_public_key: chat?.keys?.my?.kyber_public_key,
          ecdh_public_key: chat?.keys?.my?.ecdh_public_key,
          ed_public_key: chat?.keys?.my?.ed_public_key,
        },
      ],
    }
  })
}
