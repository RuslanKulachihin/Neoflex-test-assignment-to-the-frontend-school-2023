import { Component } from '../../lib/render/Component.js';
import { ProductsItem } from '../ProductsItem/ProductsItem.js';
import { getLocalizedText } from '../../service/i18nStore.js';

/**
 * @typedef {import('../../api/products.js').ProductsGroup} ProductsGroupProps
 * @extends Component<ProductsGroupProps>
 */
export class ProductsGroup extends Component {
    buildDOM() {
        const productsGroup = document.createElement('div');

        productsGroup.innerHTML = `
            <h2 class="categorie-products">${getLocalizedText(this.props.groupTitle)}</h2>
            <section class="store_products">
                <div class="store_products-contane"></div>
            </section>
        `;

        productsGroup.querySelector('.store_products-contane').append(...this.props.items.map((itemData) => new ProductsItem(itemData).buildDOM()));

        return productsGroup;
    }
}
