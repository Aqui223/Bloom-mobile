export default function (realm, id) {
    return realm
        .objects("Message")
        .filtered("id == $0", id)[0]
}