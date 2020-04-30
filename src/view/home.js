import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';

const navMenu = () => {
  const menu = `
  <input type="checkbox" id="btn-menu">
  <label class="menuLabel" for="btn-menu"><img src="../img/icono-menu.png" alt="">
  </label>
    <a href="#/home">
        <h1>EducaChat</h1>
    </a>
    <nav>
        <ul>
            <li>
                <a href="#/profile">Perfil</a>
            </li>
            <li>
                <a id="SignOut" href="#/">Cerrar Sesion</a>
            </li>
        </ul>
    </nav>
    `;
  const headerMenu = document.createElement('header');
  headerMenu.classList.add('divNav');
  headerMenu.innerHTML = menu;
  const anchorSignOut = headerMenu.querySelector('#SignOut');
  anchorSignOut.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('SignOut Ok');
    signOut();
    authentification();
  });
  return headerMenu;
};


const avatarProfile = () => {
  const avatar = `    
      <p class="headerHomeAvatar"></p>
      <label id="myUserName">Nombre</label>  
      <img class="imageAvatar" src="img/avatar.png">        
    `;
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('homeAvatarContainer');
  sectionProfile.innerHTML = avatar;
  // const userEmail = myCurrentUser();
  // console.log(userEmail);
  // sectionProfile.querySelector('#myUserName').innerHTML=`Bienvenid@ usuari@:${userEmail.email}`;
  return sectionProfile;
};

const mainPublication = () => {
  const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div class="footerHomePublication">
        <select id="optionsPublic" class="selectPublic">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button class="compartirBtn">Compartir</button>
      `;
  const sectionPublication = document.createElement('section');
  sectionPublication.innerHTML = publication;
  sectionPublication.classList.add('homePublicationContainer');
  return sectionPublication;
};

export const homeTemplate = () => {
  const mainElem = document.createElement('main');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublication());
  mainElem.classList.add('homeContainer');
  return mainElem;
};
