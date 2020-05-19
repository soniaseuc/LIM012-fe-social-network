import { currentUserUid } from '../../firestore-controller/authenticationRouter.js';
import {
  editNote,
  deletePublication, changeVisibility,
} from '../../firestore-controller/firestore.js';

const validatePost = (img, status, doc) => {
  // B/C THERE WAS AN BROKEN IMG ON EACH PUBLISHED POST
  let postTemplate = '';
  if (img) {
    postTemplate = `
        <p class="textComent" id="pEdit-${doc}">${status}</p>    
        <img  class="postedImg" src="${img}">
        `;
  } else {
    postTemplate = `
        <p class="textComent" id="pEdit-${doc}">${status}</p>    
        `;
  }
  // console.log(doc);
  return postTemplate;
};

const publicNotCurrentUser = (doc) => {
  const section = document.createElement('section');
  section.innerHTML = `
  <header class="headerUserName">
      <h1 class="nameTitlePublication">${doc.data().name} </h1>
      <div id="ifPublicButMine"></div>
  </header>
  <section class="notes" id="content">
      ${validatePost(doc.data().img, doc.data().status, doc.id)}
      <textarea id="textareaEdit-${doc.id}" class="displayNone">${doc.data().status}</textarea>
      <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
      <div class="notesIcons, footerPost">
      <button id="likeHeart" class="circle displayNone"><img src="img/icons/heart-solid.svg"></button>
      <button id="likeHeart" class="circlePink displayNone"><img src="img/icons/comments.svg"></button>
      </div>
  </section>
  `;
  return section;
};

const validateVisibility = (doc) => {
  let select = '';
  if (doc.data().visibility === 'private') {
    select = `    
    <select  class="publicOrPrivateSelector">
      <option value="private">${doc.data().visibility === 'private' ? 'Privado' : 'Publico'}</option>
      <option value="public">${doc.data().visibility === 'public' ? 'Privado' : 'Publico'}</option>
    </select>`;
  } else {
    select = `    
    <select class="publicOrPrivateSelector">
      <option value="public">${doc.data().visibility === 'private' ? 'Privado' : 'Publico'}</option>
      <option value="private">${doc.data().visibility === 'public' ? 'Privado' : 'Publico'}</option>
    </select>`;
  }
  return select;
};

const privateCurrentUser = (doc) => {
  const section = document.createElement('section');

  section.innerHTML = `
  <header>
  ${validateVisibility(doc)}
    <h1 class="nameTitlePublication">${doc.data().name} </h1>
    <figure class="figureContainerIcons">
      <input name="delete" type="checkbox">
      <label for="delete">
          <img src="img/icons/trash.svg">
      </label>
    </figure>
    <figure class="figureContainerIcons">
      <input name="edit" type="checkbox">
      <label for="edit">
          <img src="img/icons/modificar.svg">
      </label>
    </figure>
  </header>
  <section class="notes" id="content">
      ${validatePost(doc.data().img, doc.data().status, doc.id)}
      <textarea name="textareaEdit" class="displayNone">${doc.data().status}</textarea>
      <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
      <div class="notesIcons">
      <button id="likeHeart" class="circle displayNone"><img src="img/icons/heart-solid.svg"></button>
      <button id="likeHeart" class="circlePink displayNone"><img src="img/icons/comments.svg"></button>
      <button class="cambioBtn">Guardar Cambio</button>
      </div>
  </section>
  `;

  // agregando evento de click al btn eliminar un post
  const btnDeleted = section.querySelector('[for="delete"]');
  console.log(btnDeleted);
  btnDeleted.addEventListener('click', () => {
    deletePublication(doc.id);
  });


  // FUNCIONES PARA EDITAR PUBLICACION
  const publicOrPrivateSelector = section.querySelector('.publicOrPrivateSelector');
  // console.log(publicOrPrivateSelector);
  if (publicOrPrivateSelector != null) {
    console.log(publicOrPrivateSelector.value);
    publicOrPrivateSelector.addEventListener('change', (e) => {
      e.preventDefault();
      console.log(e.target.value);
      changeVisibility(doc.id, publicOrPrivateSelector.value);
    });
  }

  const modificar = section.querySelector('[for="edit"]');
  const textareaEdit = section.querySelector('[name="textareaEdit"]');
  // al hacer click en el boton del lapiz para editar publicacion
  modificar.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('dentro de boton modificar');
    textareaEdit.classList.remove('displayNone');
    textareaEdit.focus();
  });

  // agregando evento de click al btn guardar cambio en la publicacion
  const btnEdit = section.querySelector('.cambioBtn');
  console.log(btnEdit); // null
  if (btnEdit) {
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      editNote(doc.id, textareaEdit.value);
    });
  }

  return section;
};


export const posts = (array) => {
  const currentUserId = currentUserUid();
  const post = document.createElement('section');
  post.className = 'publicationSection';
  // post.innerHTML = '';
  array.forEach((doc) => {
    if (doc.data().visibility === 'public' && doc.data().id !== currentUserId.uid) {
      post.appendChild(publicNotCurrentUser(doc));
    } if (doc.data().visibility === 'private' && doc.data().id === currentUserId.uid) {
      post.appendChild(privateCurrentUser(doc));
    } if (doc.data().visibility === 'public' && doc.data().id === currentUserId.uid) {
      post.appendChild(privateCurrentUser(doc));
    }
  });
  return post;
};
