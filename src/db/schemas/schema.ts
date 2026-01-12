import { appSchema } from '@nozbe/watermelondb'
import { messageSchema } from './messageSchema'

export const schema = appSchema({
  version: 1,
  tables: [messageSchema],
})
