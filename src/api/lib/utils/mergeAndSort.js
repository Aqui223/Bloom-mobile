import uniqueById from './uniqueById'

// sort messages by id function
export default function (prev, next) {
  return uniqueById([...prev, ...next]).sort((a, b) => new Date(a.date) - new Date(b.date))
}
