export class Store {
    constructor(getInitialState) {
        this.#getInitialState = getInitialState;
    }

    init() {
        this.#state = this.#getInitialState();
    }

    on(storeEvent, storeEventCallback) {
        storeEvent.addSubscriberCallback((payload) => {
            this.#state = storeEventCallback(this.#state, payload);
        });

        return this;
    }

    getState() {
        return this.#state;
    }
}
