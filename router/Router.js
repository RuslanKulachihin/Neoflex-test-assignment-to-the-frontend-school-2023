import { Component } from '../lib/render/Component.js';
import { $routerStore, changeRoute } from '../service/routerStore.js';

export class Router extends Component {
    buildDOM() {
        return this.#tryRenderRoute($routerStore.getState().currentURL, this.props.defaultRoute);
    }

    #tryRenderRoute(url, fallbackURL) {
        try {
            return this.#renderRoute(url);
        } catch (ReferenceError) {}

        try {
            if (fallbackURL !== undefined) {
                changeRoute.call(fallbackURL);
                return this.#renderRoute(fallbackURL);
            }
        } catch (ReferenceError) {
            return this.props.errorComponent.buildDOM();
        }

        return this.props.errorComponent.buildDOM();
    }

    #renderRoute(url) {
        const mappedComponent = this.props.mapper.find((entry) => entry.path === url)?.component;

        if (mappedComponent === undefined) {
            throw new ReferenceError('The given route is not processed by any component.');
        }

        return mappedComponent.buildDOM();
    }
}
