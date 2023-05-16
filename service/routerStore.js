import { Store } from '../lib/store/Store.js';
import { getCurrentURL, pushToHistory } from '../lib/router.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

/**
 * @typedef {{
 *  currentURL: URLPath;
 * }} RouterState
 */

/** @type {StoreEvent<URLPath>} */
export const changeRoute = new StoreEvent();

/** @type {StoreEvent} */
export const updateRouterStore = new StoreEvent();

/**
 * @type {Store<RouterState>}
 */
export const $routerStore = new Store(getInitialState)
    .on(changeRoute, handleChangeRoute)
    .on(updateRouterStore, handleUpdateRouterStore);

/**
 * @returns {RouterState}
 */
function getInitialState() {
    window.addEventListener('popstate', () => updateRouterStore.call());

    return {
        currentURL: getCurrentURL(),
    };
}

/**
 * @param {RouterState} state
 * @param {URLPath} newURL
 * @returns {RouterState}
 */
function handleChangeRoute(state, newURL) {
    pushToHistory(newURL);
    return {
        ...state,
        currentURL: newURL,
    };
}

/**
 * @param {RouterState} state
 * @returns {RouterState}
 */
function handleUpdateRouterStore(state) {
    return {
        ...state,
        currentURL: getCurrentURL(),
    };
}
