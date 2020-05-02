import { signOut } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';

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
          <img src="img/avatar.svg" alt="Profile picture">
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
        <button id="edit">Confirm Modify Profile</button>
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
    console.log(e.target);
    if (e.target === flex) {
      modal.style.display = 'none';
    }
  });

  // const modifyAccount = document.getElementById('modifyAccount');
  // const displayNameHolder = document.getElementById('displayNameHolder');
  // const photoHolder = document.getElementById('photoHolder');
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

  const editInformation = () => {
    const newNameAndPhoto = {
      newDisplayName: displayNameField.value,
      newPhotoURL: photoField.value,
    };
    // Holds all the information about the current signed in user
    const user = firebase.auth().currentUser;
    changeNameAndPhoto(user, newNameAndPhoto);
  };

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    editInformation();
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
