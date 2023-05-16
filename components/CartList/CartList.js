import { Component } from '../../lib/render/Component.js';
import { CartItem } from '../CartItem/CartItem.js';

export class CartList extends Component {
    buildDOM() {
        const cartList = document.createElement('div');
        cartList.classList.add('cart__products_contaner');

        cartList.append(...this.props.items.map((itemData) => new CartItem(itemData).buildDOM()));

        return cartList;
    }
}
