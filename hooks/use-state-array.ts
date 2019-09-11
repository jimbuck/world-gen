import { useState } from 'react';

export interface StateArray<T> {
    current: T[];
    set(value: T[]): void;
    push(item: T): void;
    unshift(item: T): void;
    removeAt(index: number): void;
    clear(): void;
    update(index: number, fields: Partial<T>): void
}

export function useStateArray<T>(initialValue: T[] = []): StateArray<T> {
    const [current, setArr] = useState(initialValue);

    return {
        current,
        set(value: T[]) {
            setArr(value);
        },
        push(item: T) {
            setArr([...current, item]);
        },
        unshift(item: T) {
            setArr([item, ...current]);
        },
        removeAt(index: number) {
            setArr([...current.slice(0, index), ...current.slice(index + 1)]);
        },
        clear() {
            setArr([])
        },
        update(index: number, fields: Partial<T>) {
            setArr([...current.slice(0, index), { ...current[index], ...fields }, ...current.slice(index + 1)]);
        }
    };
}