import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';

const navMenu = () => {
  const menu = `
  <input type="checkbox" id="btn-menu">
  <label class="menuLabel" for="btn-menu"><img src="../img/icono-menu.png" alt="">
  </label>

        <h1 class="EducaChat" >EducaChat</h1>

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
  sectionProfile.querySelector('#myUserName').innerHTML = `Bienvenid@ usuari@:${window.localStorage.getItem('email')}`;
  return sectionProfile;
};

const mainPublication = () => {
  const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
        <input id="pic-icon"></input>
        <label id="picIcon" for=pic-icon> 
          <img src="img/icons/images.svg></img>
        </label>
      <select>
        <option default>Publico</option>
        <option>Privado</option>
      </select>
      <button>Compartir</button>
       <div class="footerHomePublication">
       </div>
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
