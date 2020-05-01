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

const publicationCreated = (str) => {
  const publicationSection = document.createElement('section');
  publicationSection.classList.add('publicationSection');
  publicationSection.innerHTML = `
  <header>
    <select id="" class="publicOrPrivateSelector">
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>
    <h1 class="nameTitlePublication">Nombre</h1>
    <figure class="figureContainerIcons"><img></figure>
  </header>
  <section class="notes" id="content">
    <p>${str}</p>
    <div class="icons">
    <figure id="likeHeart"><img></figure>
    <figure id="comentIcon"><img></figure>
    </div>
  </section>
  <section class="comment" id="comments">
    <div class="userComentDone">
      <h1>NOMBRE</h1>
      <span>Comentario......</span>
      <div class="icons">
          <figure><img></figure>
          <figure><img></figure>
          <figure><img></figure>  
      </div>
    </div>
      <input placeholder="Agrega tu Comentario"></input>
  </section>
  `;
  return publicationSection;
};


export const mainPublicationForm = () => {
  const publication = `
    <div class="sharePublicationBox">
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div class="footerHomePublication">
      <figure>
      <img>
      </figure>
        <select id="optionsPublic" class="selectPublic publicationBtn">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button id="share" class="compartirBtn publicationBtn">Compartir</button>
    </div>      
  `;
  const publicationMainSection = document.createElement('section');
  const sectionPublication = document.createElement('form');
  publicationMainSection.appendChild(sectionPublication);
  publicationMainSection.classList.add('publicationMainSection');
  sectionPublication.innerHTML = publication;
  sectionPublication.classList.add('homePublicationContainer');
  const userInput = sectionPublication.querySelector('[placeholder="¿Que quieres compartir?"]');
  const shareButton = sectionPublication.querySelector('#share');
  // const publicationMainSection = document.createElement('section');
  shareButton.addEventListener('click', (event) => {
    event.preventDefault();
    const text = userInput.value;
    sectionPublication.appendChild(publicationCreated(text));
    console.log(text);
  });
  // const ul = sectionPublication.querySelector('#notes-list');
  // str.forEach((string) => {
  //  ul.appendChild(publicationCreated());
  // });
  // shareButton.addEventListener('click', addPublicationOnShare);
  return sectionPublication;
};

export const homeTemplate = () => {
  const mainElem = document.createElement('main');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublicationForm());
  mainElem.classList.add('homeContainer');
  return mainElem;
};
