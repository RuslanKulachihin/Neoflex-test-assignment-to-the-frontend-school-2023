import { $routerStore } from './routerStore.js';
import { $i18nStore } from './i18nStore.js';
import { $cartStore } from './cartStore.js';
import { $productsStore } from './productsStore.js';

const stores = [$routerStore, $i18nStore, $cartStore, $productsStore];

export function initStores() {
    stores.forEach((store) => store.init());
}
