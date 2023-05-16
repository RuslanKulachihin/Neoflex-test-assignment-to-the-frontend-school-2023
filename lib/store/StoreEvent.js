import { updateUI } from '../render/config.js';

export class StoreEvent {
    #subscriberCallbacks = [];

    call(payload = {}) {
        this.#subscriberCallbacks.forEach((callback) => callback(payload));
        updateUI();
    }

    addSubscriberCallback(callback) {
        this.#subscriberCallbacks.push(callback);
    }
}
