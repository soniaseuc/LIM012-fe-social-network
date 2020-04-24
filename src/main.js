import { data } from './data.js'; // MVC para correr test
import { changeTmp, changeHome } from './view-controller/router.js';


const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};
window.addEventListener('load', init);

data();// MVC para correr test
