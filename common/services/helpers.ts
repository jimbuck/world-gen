

export function guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function randomSeed(chunks: number = 2) {
    return Array(chunks).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36).toUpperCase()).join('');
}