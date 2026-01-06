import { API_URL } from '@constants/api'
import { Buffer } from '@craftzdog/react-native-buffer'
import { decryptKeys, encryptKeys, hashPassword } from '@lib/skid/encryptKeys'
import axios from 'axios'

interface PrivateKeysResponse {
  ciphertext: string
  nonce: string
  salt: string
}

export const authApi = {
  async handleEmailStep(email: string) {
    const res = await axios.get(`${API_URL}/user/exists`, { params: { email } })
    if (res.data?.exists === undefined) throw new Error('Failed to check user')

    if (res.data.exists) {
      axios.post(`${API_URL}/auth/request-code`, { email }).catch(console.error)
    } else {
      const regRes = await axios.post(`${API_URL}/auth/register`, { email })
      if (regRes.data?.error) throw new Error('Failed to register')
    }
    return true
  },

  async handleOtpStep(email: string, otp: string) {
    const data = await axios.post(`${API_URL}/auth/verify-code`, { email, code: otp })
    return data.data // { token, user }
  },

  async handlePasswordStep(token: string, password: string, mmkv: any): Promise<void> {
    const privateKeys: PrivateKeysResponse | null = await axios
      .get(`${API_URL}/chats/keys/private`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => r?.data)
      .catch(() => null)

    if (!privateKeys) {
      const { hash, salt } = await hashPassword(password)
      const { ciphertext, nonce } = encryptKeys(hash, new TextEncoder().encode('[]'))

      await axios.post(
        `${API_URL}/chats/keys/private`,
        { ciphertext, nonce, salt: Buffer.from(salt).toString('base64') },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      mmkv.set('password', Buffer.from(hash).toString('base64'))
      mmkv.set('salt', Buffer.from(salt).toString('base64'))
      return
    }

    const { hash } = await hashPassword(password, Buffer.from(privateKeys.salt, 'base64'))

    mmkv.set('password', Buffer.from(hash).toString('base64'))
    mmkv.set('salt', privateKeys.salt)

    try {
      const keys = decryptKeys(hash, privateKeys.ciphertext, privateKeys.nonce)
      mmkv.set(
        'chats',
        JSON.stringify(
          keys
            .map((k) => ({
              id: k.chat_id,
              keys: {
                my: {
                  kyberPublicKey: k.kyberPublicKey,
                  ecdhPublicKey: k.ecdhPublicKey,
                  edPublicKey: k.edPublicKey,
                  kyberSecretKey: k.kyberSecretKey,
                  ecdhSecretKey: k.ecdhSecretKey,
                  edSecretKey: k.edSecretKey,
                },
                recipient: {},
              },
            }))
            .filter((k) => k.id),
        ),
      )
    } catch {
      console.log('FAILED TO DECRYPT KEYS')
    }
  },
}
