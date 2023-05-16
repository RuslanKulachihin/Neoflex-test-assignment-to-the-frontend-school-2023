export const translations = [
    {
        locale: 'ru-RU',
        translation: {
            favorites: 'Избранное',
            cart: 'Корзина',
            contacts: 'Контакты',
            serviceConditions: 'Условия сервиса',
            wiredHeadphones: 'Наушники',
            wirelessHeadphones: 'Беспроводные наушники',
            buy: 'Купить',
            total: 'Итого',
            proceedToOrder: 'Перейти к оформлению',
            notFound: 'Извините, но данной страницы не существует',
            backToProducts: 'Вернуться на главную',
        },
    },
    {
        locale: 'en-US',
        translation: {
            favorites: 'Favorites',
            cart: 'Cart',
            contacts: 'Contacts',
            serviceConditions: 'Service conditions',
            wiredHeadphones: 'Wired Headphones',
            wirelessHeadphones: 'Wireless Headphones',
            buy: 'Add to cart',
            total: 'Total',
            proceedToOrder: 'Proceed to order',
            notFound: 'Sorry, the page you are looking for is absent',
            backToProducts: 'Back to the products page',
        },
    },
    {
        locale: 'kk-KZ',
        translation: {
            favorites: 'Таңдаулылар',
            cart: 'Себет',
            contacts: 'Байланыс',
            serviceConditions: 'Пайдалану шарттары',
            wiredHeadphones: 'Сымды құлаққаптар',
            wirelessHeadphones: 'Сымсыз құлаққаптар',
            buy: 'Сатып алу',
            total: 'Барлығы',
            proceedToOrder: 'Дизайнға өтіңіз',
            notFound: 'Кешіріңіз, бірақ бұл бет жоқ',
            backToProducts: 'Үйге оралу',
        },
    },
];

export const fetchTranslation = (locale) => {
    return translations.find((entry) => entry.locale === locale);
};
