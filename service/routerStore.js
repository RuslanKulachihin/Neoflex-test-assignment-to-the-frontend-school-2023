import { Store } from '../lib/store/Store.js';
import { getCurrentURL, pushToHistory } from '../lib/router.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

export const changeRoute = new StoreEvent();

export const updateRouterStore = new StoreEvent();

export const $routerStore = new Store(getInitialState).on(changeRoute, handleChangeRoute).on(updateRouterStore, handleUpdateRouterStore);

function getInitialState() {
    window.addEventListener('popstate', () => updateRouterStore.call());

    return {
        currentURL: getCurrentURL(),
    };
}

function handleChangeRoute(state, newURL) {
    pushToHistory(newURL);
    return {
        ...state,
        currentURL: newURL,
    };
}

function handleUpdateRouterStore(state) {
    return {
        ...state,
        currentURL: getCurrentURL(),
    };
}
