import { Component } from '../../lib/render/Component.js';
import { ProductsGroup } from '../ProductsGroup/ProductsGroup.js';
import { $productsStore } from '../../service/productsStore.js';

export class ProductsPage extends Component {
    buildDOM() {
        const productsGroups = $productsStore.getState();

        const productsPage = document.createElement('main');
        productsPage.append(...productsGroups.map((groupData) => new ProductsGroup(groupData).buildDOM()));

        return productsPage;
    }
}
