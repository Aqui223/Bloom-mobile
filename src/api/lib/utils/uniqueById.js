export default function (arr) {
  const map = new Map()

  arr.forEach((item) => {
    const key = item.nonce ? String(item.nonce) : String(item.id)

    if (key) {
      if (map.has(key)) {
        const existingItem = map.get(key)

        if (existingItem.isSending === false && item.isSending === true) {
          return
        }
      }

      map.set(key, item)
    }
  })

  return Array.from(map.values())
}
