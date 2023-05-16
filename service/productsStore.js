import { fetchProducts } from '../api/products.js';
import { Store } from '../lib/store/Store.js';

/**
 * @typedef {import('../api/products.js').ProductsGroup[]} ProductsState
 */

/**
 * @type {Store<ProductsState>}
 */
export const $productsStore = new Store(getInitialState);

/**
 * @returns {ProductsState}
 */
function getInitialState() {
    return fetchProducts();
}
