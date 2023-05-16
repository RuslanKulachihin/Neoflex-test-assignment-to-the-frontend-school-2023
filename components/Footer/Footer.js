import { Component } from '../../lib/render/Component.js';
import { changeLocale, getLocale, getLocalizedText } from '../../service/i18nStore.js';
import { changeRoute } from '../../service/routerStore.js';

export class Footer extends Component {
    buildDOM() {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        footer.innerHTML = `
             <p class="footer__logo logo">QPICK</p>
                <div class="footer__catalog">
                    <a href="#" class="footer__catalog_container-images style-text-regular">${getLocalizedText('favorites')}</a>
                    <a href="/cart" class="footer__catalog_container-cart style-text-regular">${getLocalizedText('cart')}</a>
                    <a href="https://github.com/RuslanKulachihin" class="footer__catalog_container-favorites style-text-regular">${getLocalizedText('contacts')}</a>
                </div>

                <div class="footer__translation">
                    <div class="footer__translation">
                        <p class="footer__translation-title style-text-regular">${getLocalizedText('serviceConditions')}</p>
                        <div class="footer__translation_container">
                            <img src="/assets/images/footer/RU.svg" alt="" class="footer__translation-logo" />
                            <ul class="footer__translation-lang">
                                <li class="footer__translation-leng style-text-medium ${getLocale().includes('kk-KZ') ? 'active' : ''}" data-locale="kk-KZ">Каз</li>
                                <li class="footer__translation-leng style-text-medium ${getLocale().includes('ru-RU') ? 'active' : ''}" data-locale="ru-RU">Рус</li>
                                <li class="footer__translation-leng style-text-medium ${getLocale().includes('en-US') ? 'active' : ''}" data-locale="en-US">Eng</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="footer__messengers">
                    <a href="" class="footer__messengers-VK"><img src="/assets/images/footer/contacts/VK.svg" alt="" class="vk" /></a>
                    <a href="" class="footer__messengers-telegram"><img src="/assets/images/footer/contacts/Telegram.svg" alt="" class="telegram" /></a>
                    <a href="" class="footer__messengers-whatsApp"><img src="/assets/images/footer/contacts/Whatsapp.svg" alt="" class="whatsApp" /></a>
                </div>
        `;

        function changeRouteButtonHandler(selector, route) {
            footer.querySelector(selector).addEventListener('click', () => changeRoute.call(route));
        }

        changeRouteButtonHandler('.footer__catalog_container-cart', '/cart');

        footer.querySelectorAll('[data-locale]').forEach((element) => {
            element.addEventListener('click', (event) => changeLocale.call(event.target.dataset['locale']));
        });

        return footer;
    }
}
