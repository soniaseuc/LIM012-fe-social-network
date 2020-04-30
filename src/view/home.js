import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';

const perfil = () => {
  const perfilModal = `
  <div id="miModal" class="modal">
  <div class="flex" id="flex">
    <div class="contenido-modal">
      <div class="modal-header flex">
        <h2>ENCABEZADO</h2>
        <span class="close" id="close">&times;</span>
      </div>
      <div class="modal-body">
        <p>Lorem ipsum</p>
        <img src="http://icons.iconarchive.com/icons/artcore-illustrations/artcore-4/128/github-icon.png">
      </div>
      <div class="footer">
        <h3>FOOTER &COPY;</h3>
      </div>
    </div>
  </div>
</div>
`;
  const profile = document.createElement('div');
  profile.innerHTML = perfilModal;
  // modal del perfil
  const modal = profile.querySelector('#miModal');
  const flex = profile.querySelector('#flex');

  const cerrar = profile.querySelector('#close');

  // abrir.addEventListener('click', () => {
  modal.style.display = 'block';
  // });


  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target === flex) {
      modal.style.display = 'none';
    }
  });


  // headerMenu.classList.add('divNav');
  // profile.setAttribute('id', 'divProfile');
  // const prueba = document.getElementById('divProfile').appendChild(perfilModal);
  // prueba.appendChild(profile);
  // profile.innerHTML = perfilModal;
  return profile;
};

const navMenu = () => {
  const menu = `
  <input type="checkbox" id="btn-menu">
  <label for="btn-menu">
    <img src="../img/icono-menu.png" alt="">
  </label>

        <h1 class="EducaChat" >EducaChat</h1>

    <nav class="nav-home">
        <ul>
            <li>
                <a id="abrir" >Perfil</a>
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
  const abrir = headerMenu.querySelector('#abrir');
  abrir.addEventListener('click', (event) => {
    event.preventDefault();
    headerMenu.appendChild(perfil());
  // const abrirProfile = profile.querySelector('#abrir');
  // abrirProfile.addEventListener('click', (event) => {
  // event.preventDefault();
  // });
  });
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
  // const userEmail = myCurrentUser();
  // console.log(userEmail);
  sectionProfile.querySelector('#myUserName').innerHTML = `Bienvenid@ usuari@:${window.localStorage.getItem('email')}`;
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
       <footer class="footer">
       <div>
           <p>Creado por Sonia Seuc y Paula Paredes</p>
       </div>
   </footer>
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
