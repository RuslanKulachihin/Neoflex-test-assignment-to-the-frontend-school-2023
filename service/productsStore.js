import { fetchProducts } from '../api/products.js';
import { Store } from '../lib/store/Store.js';

export const $productsStore = new Store(getInitialState);

function getInitialState() {
    return fetchProducts();
}
