import { initStores } from './service/config.js';
import { configureUpdateUI, updateUI } from './lib/render/config.js';
import { render } from './lib/render/render.js';
import { App } from './components/App/App.js';

const app = new App();
configureUpdateUI(() => render(document.body, app));
initStores();
updateUI();
