import { fetchTranslation } from '../api/translations.js';
import { getUserLocale } from '../lib/i18n.js';
import { LocalStorage } from '../lib/LocalStorage.js';
import { Store } from '../lib/store/Store.js';
import { StoreEvent } from '../lib/store/StoreEvent.js';

/**
 * @typedef {import('../api/translations.js').TranslationEntry} I18nState
 */

/** @type {StoreEvent<import('../api/translations.js').Locale>} */
export const changeLocale = new StoreEvent();

/**
 * @type {Store<I18nState>}
 */
export const $i18nStore = new Store(getInitialState).on(changeLocale, handleChangeLocale);

/** @type {LocalStorage<I18nState>} */
const i18nStorage = new LocalStorage('i18n');

/**
 * @returns {I18nState}
 */
function getInitialState() {
    if (i18nStorage.isSet()) {
        return i18nStorage.get();
    }

    const state = fetchTranslation(getUserLocale());
    document.documentElement.setAttribute('lang', state.locale);
    i18nStorage.set(state);
    return state;
}

/**
 * @param {I18nState} state
 * @param {import('../api/translations.js').Locale} newLocale
 * @returns {I18nState}
 */
function handleChangeLocale(state, newLocale) {
    const newState = fetchTranslation(newLocale);
    document.documentElement.setAttribute('lang', newLocale);
    i18nStorage.set(newState);
    return newState;
}

/**
 * @param {string} tag
 * @returns {string} translated text by given tag
 */
export function getLocalizedText(tag) {
    return $i18nStore.getState().translation[tag] || tag;
}

/**
 * @param {number} amount
 * @param {NumberFormatOptions} options?
 * @returns {string} localized currency by given amount
 */
export function getLocalizedCurrency(amount, options = {}) {
    return new Intl.NumberFormat($i18nStore.getState().locale, {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
        ...options,
    }).format(amount);
}

/**
 * @param {number} amount
 * @param {NumberFormatOptions} options?
 * @returns {string} localized number by given amount
 */
export function getLocalizedNumber(amount, options = {}) {
    return new Intl.NumberFormat($i18nStore.getState().locale, options).format(amount);
}

/**
 * @returns {import('../api/translations.js').Locale}
 */
export function getLocale() {
    return $i18nStore.getState().locale;
}
