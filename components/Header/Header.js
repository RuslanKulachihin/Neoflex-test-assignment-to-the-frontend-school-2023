import { Component } from '../../lib/render/Component.js';
import { changeRoute } from '../../service/routerStore.js';
import { getCartCount } from '../../service/cartStore.js';
import { getLocalizedNumber } from '../../service/i18nStore.js';

export class Header extends Component {
    buildDOM() {
        const header = document.createElement('header');
        header.classList.add('header');

        header.innerHTML = `
                <p class="header__logo logo">QPICK</p>
                <div class="header__categories categories">
                    <button class="header__categories-buttom">
                        <img src="/assets/images/header/categories/favorites.svg" alt="" class="categories__user_favorites header-img-counter" />
                        <p class="categories__user_favorites-info header-counter card-text-styles">${getLocalizedNumber(0)}</p>
                    </button>

                    <button class="header__categories-buttom">
                        <img src="/assets/images/header/categories/cart.svg" alt="" class="categories__user_cart header-img-counter" />
                        <p class="categories__user_cart-info header-counter card-text-styles">${getCartCount()}</p>
                    </button>
                </div>
        `;

        function changeRouteButtonHandler(selector, route) {
            header.querySelector(selector).addEventListener('click', (event) => {
                event.preventDefault();
                changeRoute.call(route);
            });
        }

        changeRouteButtonHandler('.logo', '/');
        changeRouteButtonHandler('.header__categories-buttom:last-child', '/cart');

        return header;
    }
}
