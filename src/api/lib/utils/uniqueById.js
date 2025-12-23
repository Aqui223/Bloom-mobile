export default function (arr) {
    const map = new Map();

    arr.forEach(item => {
        const key = item.nonce ? String(item.nonce) : String(item.id);

        if (key) {
            map.set(key, item);
        }
    });

    return Array.from(map.values());
}