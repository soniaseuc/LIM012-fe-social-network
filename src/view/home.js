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
    console.log('SignOut Ok');
    signOut();
    authentification();
  });
  return headerMenu;
};


const avatarProfile = () => {
  const avatar = `
    <figure>
    <img class="image" src="img/avatar.png" width="100px" height="100px">
    </figure>
    <label id="myUserName">Nombre</label>
    `;
  const sectionProfile = document.createElement('section');
  sectionProfile.innerHTML = avatar;
  // const emailUser = authentification();
  // sectionProfile.getElementById('myUserName').innerHTML = `Bienvenid@ usuari@: ${email}`;
  return sectionProfile;
};

const mainPublication = () => {
  const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div>
      <input id="insertImg"></input>
      <label for="insertImg">
      <button>
      <img class="icons" src="img/icons/images.svg"  width="40px" height="50px" alt="">
      </button>
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
  return sectionPublication;
};

export const homeTemplate = () => {
  const mainElem = document.createElement('main');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublication());
  return mainElem;
};
