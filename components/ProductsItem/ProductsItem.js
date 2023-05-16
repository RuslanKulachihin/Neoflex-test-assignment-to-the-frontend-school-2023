import { Component } from '../../lib/render/Component.js';
import { getLocalizedCurrency, getLocalizedNumber, getLocalizedText } from '../../service/i18nStore.js';
import { addToCart } from '../../service/cartStore.js';

/**
 * @typedef {import('../../api/products.js').Product} ProductsItemProps
 * @extends Component<ProductsItemProps>
 */
export class ProductsItem extends Component {
    buildDOM() {
        const productsItem = document.createElement('div');
        productsItem.classList.add('product');

        productsItem.innerHTML = `
            <img src="${this.props.img}" alt="" class="product__img" />
            <div class="product__info">
                <div class="product__info-features info-features">
                    <div class="product__info_name card-text-SemiBold">${this.props.title}</div>
                    <div class="product__info_price card-text-SemiBold">${getLocalizedCurrency(this.props.price)}</div>
                </div>
                <div class="product__info-features">
                  <div class="product__info_rating">
                      <img src="/assets/images/products/star.svg" alt="" class="product__info_rating-img" />
                      <p class="product__info_rating-text card-text-SemiBold">${getLocalizedNumber(this.props.rate)}</p>
                  </div>
                  <bottom class="product__info_buy card-text-SemiBold">${getLocalizedText('buy')}</bottom>
                </div>
            </div>
        `;

        productsItem.querySelector('.product__info_buy').addEventListener('click', () => addToCart.call(this.props));

        return productsItem;
    }
}
