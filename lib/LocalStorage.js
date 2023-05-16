export class LocalStorage {
    #key;

    constructor(key) {
        this.#key = key;
    }

    get() {
        const data = localStorage.getItem(this.#key);
        if (data === null) {
            throw new ReferenceError('The searchable key is absent.');
        }

        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch (SyntaxError) {
            throw new TypeError("Could not retrieve sessionStorage's item. It is possible that data has corrupted format to be parsed with JSON.");
        }

        return parsedData;
    }

    isSet() {
        const data = localStorage.getItem(this.#key);
        return data !== null;
    }

    set(value) {
        localStorage.setItem(this.#key, JSON.stringify(value));
    }
}
