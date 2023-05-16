import { LocalStorage } from '../lib/LocalStorage.js';
import { Store } from '../lib/store/Store.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

/**
 * @typedef {Object} CartStateItem
 * @property {number} count
 * @extends import('../api/products.js').Product
 */

/**
 * @typedef {CartStateItem[]} CartState
 */

/** @type {StoreEvent<Product>} */
export const addToCart = new StoreEvent();

/** @type {StoreEvent<Product>} */
export const removeFromCart = new StoreEvent();

/** @type {StoreEvent<Product>} */
export const incrementProductCounter = new StoreEvent();

/** @type {StoreEvent<Product>} */
export const decrementProductCounter = new StoreEvent();

/**
 * @type {Store<CartState>}
 */
export const $cartStore = new Store(getInitialState).on(addToCart, handleAddToCart).on(removeFromCart, handleRemoveFromCart).on(incrementProductCounter, handleIncrementProductCounter).on(decrementProductCounter, handleDecrementProductCounter);

/** @type {LocalStorage<CartState>} */
const cartStorage = new LocalStorage('cart');

/**
 * @returns {CartState}
 */
function getInitialState() {
    if (cartStorage.isSet()) {
        return cartStorage.get();
    }

    const state = [];

    cartStorage.set(state);
    return state;
}

/**
 * @param {CartState} state
 * @param {Product} product
 * @returns {CartState}
 */
function handleAddToCart(state, product) {
    const productInCart = state.find((item) => item.id === product.id);
    if (productInCart !== undefined) {
        productInCart.count++;
        cartStorage.set(state);
        return state;
    }

    const newState = [
        ...state,
        {
            ...product,
            count: 1,
        },
    ];
    cartStorage.set(newState);
    return newState;
}

/**
 * @param {CartState} state
 * @param {ProductID} productId
 * @returns {CartState}
 */
function handleRemoveFromCart(state, productId) {
    const newState = state.filter((item) => item.id !== productId);
    cartStorage.set(newState);
    return newState;
}

/**
 * @param {CartState} state
 * @param {ProductID} productId
 * @returns {CartState}
 */
function handleIncrementProductCounter(state, productId) {
    const productInCart = state.find((item) => item.id === productId);
    productInCart.count++;
    cartStorage.set(state);
    return state;
}

/**
 * @param {CartState} state
 * @param {ProductID} productId
 * @returns {CartState}
 */
function handleDecrementProductCounter(state, productId) {
    const productInCart = state.find((item) => item.id === productId);
    if (productInCart.count === 1) {
        return state;
    }

    productInCart.count--;
    cartStorage.set(state);
    return state;
}

/**
 * @returns {number}
 */
export function getCartCount() {
    return $cartStore.getState().length;
}

/**
 * @returns {number}
 */
export function getTotalPrice() {
    return $cartStore.getState().reduce((total, item) => total + item.price * item.count, 0);
}

/**
 * @param {ProductID} productId
 * @returns {number}
 */
export function getProductTotalPrice(productId) {
    const productInCart = $cartStore.getState().find((item) => item.id === productId);
    return productInCart.count * productInCart.price;
}
