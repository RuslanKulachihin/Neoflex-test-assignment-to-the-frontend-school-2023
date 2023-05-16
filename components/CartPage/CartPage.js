import { Component } from '../../lib/render/Component.js';
import { CartList } from '../CartList/CartList.js';
import { $cartStore, getTotalPrice } from '../../service/cartStore.js';
import { getLocalizedCurrency, getLocalizedText } from '../../service/i18nStore.js';

export class CartPage extends Component {
    buildDOM() {
        const cartItems = $cartStore.getState();

        const cartPage = document.createElement('main');

        cartPage.innerHTML = `
            <h2 class="title___cart_products text-SemiBold">${ getLocalizedText('cart') }</h2>
            <section class="cart">
                <div></div>
                <div class="cart__price">
                    <div class="cart__price_info">
                        <p class="cart__price_info-total text-SemiBold">${ getLocalizedText('total') }</p>
                        <p class="cart__price_info-total-price text-SemiBold"><span class="currency text-SemiBold">
                          ${ getLocalizedCurrency(getTotalPrice()) }
                        </p>
                    </div>
                    <button class="cart__price_design-button text-SemiBold text-SemiBold">${ getLocalizedText('proceedToOrder') }</button>
                </div>
            </section>
        `;

        cartPage.querySelector('.cart').prepend(new CartList({
            items: cartItems,
        }).buildDOM());

        return cartPage;
    }
}
