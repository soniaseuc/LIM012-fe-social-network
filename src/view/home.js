import { signOut, authentification } from '../firebase.js';

const navMenu = () => {
  const menu = `
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
      <img class="imageAvatar" src="img/avatar.png">
      <label id="myUserName">Nombre</label>
    
    
    `;
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('homeAvatarContainer');
  sectionProfile.innerHTML = avatar;
  authentification();
  // sectionProfile.getElementById('myUserName').innerHTML = `Bienvenid@ usuari@: ${email}`;
  return sectionProfile;
};

const mainPublication = () => {
  const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div class="footerHomePublication">
        <input id="pic-icon"></input>
        <label id="picIcon" for=pic-icon> 
          <img src="img/icons/images.svg></img>
        </label>
        <select>
          <option default>Publico</option>
          <option>Privado</option>
        </select>
        <button>Compartir</button>
      </div>
      `;
  const sectionPublication = document.createElement('section');
  sectionPublication.innerHTML = publication;
  sectionPublication.classList.add('homePublicationContainer');
  return sectionPublication;
};

export const homeTemplate = () => {
  const homeElem = document.getElementById('homeContainer');
  const mainElem = document.createElement('main');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublication());
  homeElem.appendChild(mainElem);
  return homeElem;
};
