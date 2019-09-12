import { useState, Dispatch, SetStateAction } from 'react';

import useStatePersisted from './use-state-persisted';

export interface StateArray<T> {
    current: T[];
    set(value: T[]): void;
    /**
     * Adds an item to the end of the array.
     * @param item The item to add.
     */
    push(item: T): void;
    /**
     * Adds an item to the start of the array.
     * @param item The item to add.
     */
    unshift(item: T): void;
    removeAt(index: number): void;
    removeWhere(predicate: (value: T, index: number, array: T[]) => value is T): void;
    clear(): void;
    update(index: number, fields: Partial<T>): void
}

/**
 * Creates a state and setter function that persists the array to localStorage.
 * @param key The key to use for localStorage.
 * @param initialValue The initial array value to use.
 */
export function useStateArrayPersisted<T>(key: string, initialValue: T[] = []): StateArray<T> {
    const [current, setArr] = useStatePersisted(key, initialValue);

    return _useStateArrayLogic(current, setArr);
}

/**
 * Creates a state and setter function for the array.
 * @param initialValue The initial value to use.
 */
export function useStauteArray<T>(initialValue: T[] = []): StateArray<T> {
    const [current, setArr] = useState(initialValue);

    return _useStateArrayLogic(current, setArr);
}

function _useStateArrayLogic<T>(current: T[], setArr: Dispatch<SetStateAction<T[]>>): StateArray<T> {

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
        removeWhere(predicate: (value: T, index: number, array: T[]) => value is T) {
            setArr(current.filter(predicate));
        },
        clear() {
            setArr([])
        },
        update(index: number, fields: Partial<T>) {
            setArr([...current.slice(0, index), { ...current[index], ...fields }, ...current.slice(index + 1)]);
        }
    };
}