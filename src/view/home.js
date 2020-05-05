import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';
import { publishStatus } from '../firestore.js';

const perfil = () => {
  const perfilModal = `
  <div id="miModal" class="modal">
  <div class="flex" id="flex">
    <div class="contenido-modal">
      <div class="modal-header flex">
        <h2>Modifica tu Perfil</h2>
        <span class="close" id="close">&times;</span>
      </div>
      <div class="modal-body">

        <div>
          <img src="http://icons.iconarchive.com/icons/artcore-illustrations/artcore-4/128/github-icon.png">
        </div>
        <div>
          <span for="displayName">Display name</span> <br>
          <input type="text" id="displayName" name="displayName"/> <br>
        </div>
        <div>
          <span for="photo">Url of picture</span> <br>
          <input type="url" id="photo"/> <br>
        </div>

      </div>
      <div class="footer">
        <button id="edit">Confirm Change</button>
        <span>... Por favor cierra esta ventana para regresar al home y ver tu perfil actualizado</span>
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

  modal.style.display = 'block';

  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target === flex) {
      modal.style.display = 'none';
    }
  });
  // Incio de funciones para editar nombre y foto del user
  const auth = firebase.auth();
  auth.onAuthStateChanged((user) => {
    console.log(user);
  });

  const displayNameField = profile.querySelector('#displayName');
  const photoField = profile.querySelector('#photo');
  const editButton = profile.querySelector('#edit');


  const changeNameAndPhoto = (user, newNameAndPhoto) => {
    const { newDisplayName, newPhotoURL } = newNameAndPhoto;
    // Changes displayName and photoURL properties
    if (newDisplayName && newPhotoURL) {
      user.updateProfile({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      })
        .then(() => {
          console.log('Profile updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (newDisplayName) {
      // Changes the displayName only
      user.updateProfile({
        displayName: newDisplayName,
      })
        .then(() => {
          console.log('DisplayName updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (newPhotoURL) {
      // Changes photoURL only
      user.updateProfile({
        photoURL: newPhotoURL,
      })
        .then(() => {
          console.log('PhotoURL updated successfully !');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // funcion que edita el nombre y foto del user
  const editInformation = () => {
    const newNameAndPhoto = {
      newDisplayName: displayNameField.value,
      newPhotoURL: photoField.value,
    };
    // Holds all the information about the current signed in user
    const user = firebase.auth().currentUser;
    changeNameAndPhoto(user, newNameAndPhoto);
  };
  // btn para editar nombre y foto del user
  editButton.addEventListener('click', () => {
    // event.preventDefault();
    editInformation();
    // window.location.reload();
  });

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
      <label id="myUserName">Nombre</label>
      <div>  
        <p id="displayNameHolder"></p>
        <div><img id ="photoHolder" class="imageAvatar" src="img/avatar.png" alt="Profile picture">
        </div>
      </div>       
    `;
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('homeAvatarContainer');
  sectionProfile.innerHTML = avatar;
  // const userEmail = myCurrentUser();
  // console.log(userEmail);
  sectionProfile.querySelector('#myUserName').innerHTML = `Bienvenid@ usuari@:${window.localStorage.getItem('email')}`;

  // show edit profile

  firebase.auth().onAuthStateChanged((user) => {
    // display the displayName and photoURL of the user on the page
    if (user.displayName || user.photoURL) {
      sectionProfile.querySelector('#displayNameHolder').innerHTML = user.displayName;
      sectionProfile.querySelector('#photoHolder').src = user.photoURL;
    } else {
      console.log('Ocurrio un error cargando la foto y nombre cambiado');
    }
  });


  // Go to modification page
  // modifyAccount.addEventListener('click', (event) => {
  //   event.preventDefault();
  //   sectionProfile.appendChild(perfil());
  // });

  return sectionProfile;
};

// const publicationCreated = () => {
//   const publicationSection = document.createElement('section');
//   publicationSection.setAttribute('id', 'publicationSection');
//   publicationSection.classList.add('publicationSection');
//   // firebase.firestore().collection('post').onSnapshot((querySnapshot) => {
//   //   // allPosts.innerHTML = '';
//   //   querySnapshot.forEach((doc) => {
//   publicationSection.innerHTML = `
//         <section id="statusPost">

//         </section>
//         `;
//   // });
//   // });
//   // console.log(getStatus());
//   return publicationSection;
// };


export const mainPublicationForm = () => {
  const publication = `
    <div class="sharePublicationBox">
      <textarea  class="textComent" placeholder="¿Que quieres compartir?"></textarea>
      <div class="footerHomePublication">
      <figure>
      <img src="img/icons/images.svg">
      </figure>
        <select id="optionsPublic" class="selectPublic publicationBtn">
          <option value="publico">Publico</option>
          <option value="privado">Privado</option>
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
  const shareButton = sectionPublication.querySelector('#share');
  const textarea = sectionPublication.querySelector('[placeholder="¿Que quieres compartir?"]');
  shareButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userName = firebase.auth().currentUser.displayName;
    const status = textarea.value;
    // console.log(publishStatus(userName, status));
    publishStatus(userName, status);
    // sectionPublication.appendChild(publicationCreated());
    // getStatus(status);
  });
  return sectionPublication;
};

export const homeTemplate = () => {
  const mainElem = document.createElement('main');
  const mainComentarios = document.createElement('section');
  mainComentarios.setAttribute('id', 'comentarios');
  mainComentarios.classList.add('postSection');
  mainElem.appendChild(navMenu());
  mainElem.appendChild(avatarProfile());
  mainElem.appendChild(mainPublicationForm());
  mainElem.appendChild(mainComentarios);
  // mainComentarios.appendChild(getStatus());

  mainElem.classList.add('homeContainer');
  return mainElem;
};
