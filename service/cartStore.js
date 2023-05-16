import { LocalStorage } from '../lib/LocalStorage.js';
import { Store } from '../lib/store/Store.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

export const addToCart = new StoreEvent();

export const removeFromCart = new StoreEvent();

export const incrementProductCounter = new StoreEvent();

export const decrementProductCounter = new StoreEvent();

export const $cartStore = new Store(getInitialState).on(addToCart, handleAddToCart).on(removeFromCart, handleRemoveFromCart).on(incrementProductCounter, handleIncrementProductCounter).on(decrementProductCounter, handleDecrementProductCounter);

const cartStorage = new LocalStorage('cart');

function getInitialState() {
    if (cartStorage.isSet()) {
        return cartStorage.get();
    }

    const state = [];

    cartStorage.set(state);
    return state;
}

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

function handleRemoveFromCart(state, productId) {
    const newState = state.filter((item) => item.id !== productId);
    cartStorage.set(newState);
    return newState;
}

function handleIncrementProductCounter(state, productId) {
    const productInCart = state.find((item) => item.id === productId);
    productInCart.count++;
    cartStorage.set(state);
    return state;
}

function handleDecrementProductCounter(state, productId) {
    const productInCart = state.find((item) => item.id === productId);
    if (productInCart.count === 1) {
        return state;
    }

    productInCart.count--;
    cartStorage.set(state);
    return state;
}

export function getCartCount() {
    return $cartStore.getState().length;
}

export function getTotalPrice() {
    return $cartStore.getState().reduce((total, item) => total + item.price * item.count, 0);
}

export function getProductTotalPrice(productId) {
    const productInCart = $cartStore.getState().find((item) => item.id === productId);
    return productInCart.count * productInCart.price;
}
