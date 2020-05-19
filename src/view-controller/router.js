import { components } from '../view/index.js';
import { getStatus } from '../firestore-controller/firestore.js';

// import { posts } from '../view/components/post.js';

// import { getStatus } from '../firestore-controller/firestore.js';
// controlar el cambio de la vista == view-controler
export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('logIn');
  // const comentarios = document.getElementById('comentarios');
  sectionMain.innerHTML = '';
  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(components.logInform()); }
    case '#/signUpform':
    case '#/logInform':
    case '#/profile':
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
