import { components } from '../view/index.js';
import { getStatus } from '../firestore-controller/firestore.js';


// controlar el cambio de la vista == view-controler
export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('logIn');
  sectionMain.innerHTML = '';
  switch (hash) {
    case '':
    case '#':
    case '#/':
    case '#/logInform':
    { return sectionMain.appendChild(components.logInform()); }
    case '#/signUpform':
    // case '#/profile':
    { return sectionMain.appendChild(components[id]()); }
    case '#/home':
    { return getStatus((notes) => {
      sectionMain.innerHTML = '';
      sectionMain.appendChild(components.home(notes));
    });
    }
    default:
      return sectionMain.appendChild(components.different());
  }
};
