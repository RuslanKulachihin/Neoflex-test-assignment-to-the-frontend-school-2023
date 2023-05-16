import { Component } from '../../lib/render/Component.js';
import { Footer } from '../Footer/Footer.js';
import { Header } from '../Header/Header.js';

import { Router } from '../../router/Router.js';
import { CartPage } from '../CartPage/CartPage.js';
import { ProductsPage } from '../ProductsPage/ProductsPage.js';

export class App extends Component {
    buildDOM() {
        const app = document.createElement('div');
        app.classList.add('container');

        app.append(new Header().buildDOM());
        app.append(
            new Router({
                mapper: [
                    { path: '/', component: new ProductsPage() },
                    { path: '/cart', component: new CartPage() },
                ],
                defaultRoute: '/',
            }).buildDOM()
        );
        app.append(new Footer().buildDOM());

        return app;
    }
}
