import Realm from "realm";

import { Message } from "src/schemas/message";

export default async function initRealm() {
  return await Realm.open({
    path: "messages.realm",
    schema: [Message],
  });;
}