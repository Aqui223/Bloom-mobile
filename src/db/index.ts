import { Database } from '@nozbe/watermelondb'
import { adapter } from './adapter'
import { Message } from './models/Message'

export const database = new Database({
  adapter,
  modelClasses: [Message],
})
