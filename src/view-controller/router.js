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
    case '#/home':
    { return sectionMain.appendChild(components[id]()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};
