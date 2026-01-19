import { Q } from '@nozbe/watermelondb'
import { database } from 'src/db'

export default async function (id) {
  const collection = database.get('messages')

  const results = await collection.query(Q.where('server_id', id)).fetch()

  return results[0] ?? null
}
