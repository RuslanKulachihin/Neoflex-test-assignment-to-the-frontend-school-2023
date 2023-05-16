import { fetchTranslation } from '../api/translations.js';
import { getUserLocale } from '../lib/i18n.js';
import { LocalStorage } from '../lib/LocalStorage.js';
import { Store } from '../lib/store/Store.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

export const changeLocale = new StoreEvent();

export const $i18nStore = new Store(getInitialState).on(changeLocale, handleChangeLocale);

const i18nStorage = new LocalStorage('i18n');

function getInitialState() {
    if (i18nStorage.isSet()) {
        return i18nStorage.get();
    }

    const state = fetchTranslation(getUserLocale());
    document.documentElement.setAttribute('lang', state.locale);
    i18nStorage.set(state);
    return state;
}

function handleChangeLocale(state, newLocale) {
    const newState = {
        ...state,
        ...fetchTranslation(newLocale),
    };

    document.documentElement.setAttribute('lang', newLocale);
    i18nStorage.set(newState);
    return newState;
}

export function getLocalizedText(tag) {
    return $i18nStore.getState().translation[tag] || tag;
}

export function getLocalizedCurrency(amount, options = {}) {
    return new Intl.NumberFormat($i18nStore.getState().locale, {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
        ...options,
    }).format(amount);
}

export function getLocalizedNumber(amount, options = {}) {
    return new Intl.NumberFormat($i18nStore.getState().locale, options).format(amount);
}

export function getLocale() {
    return $i18nStore.getState().locale;
}
