import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schemas/schema'

export const adapter = new SQLiteAdapter({
  schema,
  dbName: 'messenger',
  jsi: true,
})
