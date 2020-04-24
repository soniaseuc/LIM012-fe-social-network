import { components } from '../view/index.js';
// controlar el cambio de la vista == view-controler
export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('logIn');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(components.logInform()); }
    case '#/signUpform':
    { return sectionMain.appendChild(components[id]()); }
    case '#/home':
    { return sectionMain.appendChild(components.home()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};
