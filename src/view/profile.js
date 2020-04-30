import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';

const navMenu = () => {
  const profileView = document.createElement('header');
  profileView.innerHTML = `
        <input type="checkbox" id="btn-menu">
        <label for="btn-menu">
            <img src="../img/icono-menu.png" alt="">
        </label>

        <h1 class="EducaChat" >Perfil</h1>
        
        <nav class="nav-home">
            <ul>
            <li>
                <a href="#/home" >Inicio</a>
            </li>
            <li>
                <a id="SignOut" href="#/">Cerrar Sesion</a>
            </li>
            </ul>
        </nav>
    `;

  const btnSignOut = profileView.querySelector('#SignOut');
  btnSignOut.addEventListener('click', (event) => {
    event.preventDefault();
    signOut();
    authentification();
  });

  return profileView;
};

const mainProfileEdit = () => {
  const userName = window.localStorage.getItem('email');
  const profileEdit = `
    <div>
        <p>${userName}</p>
      <p>Puedes modificar aqui tus datos de perfil</p>
    </div>
`;

  const sectionProfile = document.createElement('section');
  sectionProfile.innerHTML = profileEdit;
  return sectionProfile;
};

export const profileTemplate = () => {
  const mainElem = document.createElement('main');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(mainProfileEdit());
  mainElem.classList.add('homeContainer');
  return mainElem;
};
