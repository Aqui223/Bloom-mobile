// format
// [{ chat_id, kyber_secret_key, ecdh_secret_key, ed_secret_key }, ...]

export default function (mmkv) {
  let chats
  try {
    chats = JSON.parse(mmkv.getString('chats'))
  } catch {
    chats = []
  }

  return chats.map((chat) => {
    const _keys = chat?.keys?.my
    if (!_keys) return {}
    return {
      chat_id: chat?.id,
      kyber_public_key: _keys.kyber_public_key,
      ecdh_public_key: _keys.ecdh_public_key,
      ed_public_key: _keys.ed_public_key,
      kyber_secret_key: _keys.kyber_secret_key,
      ecdh_secret_key: _keys.ecdh_secret_key,
      ed_secret_key: _keys.ed_secret_key,
    }
  })
}
