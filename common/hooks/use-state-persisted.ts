import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface StateDispatcher<T> {
    current: T;
    set: Dispatch<SetStateAction<T>>;
}

/**
 * Creates a state and setter function that persists to localStorage.
 * @param key The key to use for localStorage.
 * @param initialValue The initial value to use.
 */
export default function useStatePersisted<T>(key: string, initialValue: T): StateDispatcher<T> {
    const [state, setState] = useState<T>(initialValue);

    function setLocalStorageState(value: T|((value: T) => T)) {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return setState(valueToStore);
    }

    useEffect(() => {
        const stateFromStorage = getFromLocalStorage<T>(key, initialValue);
        setLocalStorageState(stateFromStorage);
    }, []);

    return { current: state, set: setLocalStorageState };
}

function getFromLocalStorage<T>(key: string, defaultValue?: T): T {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.log(error);
        return defaultValue;
    }
}