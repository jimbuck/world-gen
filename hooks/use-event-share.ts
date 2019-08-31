
export interface EventShareHandler<T> {
    (args: T): void;
}

export class EventShare<T> {
    private handlers: EventShareHandler<T>[] = [];
    public bind(handler: EventShareHandler<T>) {
        this.handlers.push(handler);
    }

    public emit(args: T) {
        this.handlers.forEach(handler => handler.call(null, args));
    }

    public unbind(handler: EventShareHandler<T>) {
        this.handlers.splice(this.handlers.indexOf(handler), 1);
    }
}

export function useEventShare<T>() {
    return new EventShare<T>();
}