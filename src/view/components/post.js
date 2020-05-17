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

export const posts = (array) => {
  // const mainElem = document.getElementById('mainElement');
  const statusPost = document.createElement('section');
  statusPost.setAttribute('id', 'comentarios');
  statusPost.classList.add('postSection');
  // mainElem.appendChild(statusPost);
  // const statusPost = document.getElementById('comentarios');
  // const post = document.createElement('section');
  statusPost.innerHTML = '';
  array.forEach((doc) => {
    const post = document.createElement('section');
    const currentUserId = currentUserUid();
    // statusPost.innerHTML = '';
    if (doc.data().visibility === 'public' && doc.data().id !== currentUserId.uid) {
      // B/C PUBLIC STATUS SHOULD BE DISPLAY TO EVERYONE
      post.className = 'publicationSection';
      post.setAttribute('id', `publicationSection-${doc.data().id}`);
      post.innerHTML += `
                  <header class="headerUserName">
                      <h1 class="nameTitlePublication">${doc.data().name} </h1>
                      <div id="ifPublicButMine"></div>
                  </header>      
                  <section class="notes" id="content">
                      ${validatePost(doc.data().img, doc.data().status, doc.data().id)}
                      <textarea id="textareaEdit-${doc.data().id}" class="displayNone">${doc.data().status}</textarea>
                      <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                      <div class="notesIcons, footerPost">
                      <button id="likeHeart" class="circle displayNone"><img src="img/icons/heart-solid.svg"></button>
                      <button id="likeHeart" class="circlePink displayNone"><img src="img/icons/comments.svg"></button>
                      </div>
                  </section>
                      `;
      statusPost.appendChild(post);
    } if (doc.data().visibility === 'private' && doc.data().id === currentUserId.uid) {
      console.log(`HOLA privado if ${currentUserId.uid}`);

      // B/C PRIVATE ESTATUS CAN ONLY BE SEEN BY THE CURRENT USER
      // console.log(`HOLA ${currentUserUid.uid} MI POST ES ${doc.data().status}`);
      post.className = 'publicationSection';
      post.innerHTML += `
                      <header>
                          <select id="publicOrPrivateSelector-${doc.data().id}" class="publicOrPrivateSelector">
                          <option value="private">${doc.data().visibility === 'private' ? 'Privado' : 'Publico'}</option>
                          <option value="public">${doc.data().visibility === 'public' ? 'Privado' : 'Publico'}</option>
                          </select>
                          <h1 class="nameTitlePublication">${doc.data().name} </h1>
                          <figure class="figureContainerIcons">
                            <input id="delete-${doc.data().id}" type="checkbox">
                            <label for="delete-${doc.data().id}">
                                <img src="img/icons/trash.svg">
                            </label>
                          </figure>
                          <figure class="figureContainerIcons">
                            <input id="edit-${doc.data().id}" type="checkbox">
                            <label for="edit-${doc.data().id}">
                                <img src="img/icons/modificar.svg">
                            </label>
                          </figure>
                      </header>
                      <section class="notes" id="content">
                          ${validatePost(doc.data().img, doc.data().status, doc.data().id)}
                          <textarea id="textareaEdit-${doc.data().id}" class="displayNone">${doc.data().status}</textarea>
                          <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                          <div class="notesIcons">
                          <button id="likeHeart" class="circle displayNone"><img src="img/icons/heart-solid.svg"></button>
                          <button id="likeHeart" class="circlePink displayNone"><img src="img/icons/comments.svg"></button>
                          <button id="btnSaveEdit-${doc.data().id}" class="cambioBtn">Guardar Cambio</button>
                          </div>
                      </section>
                      `;
      statusPost.appendChild(post);
    } if (doc.data().visibility === 'public' && doc.data().id === currentUserId.uid) {
      console.log(`HOLA publico 2 if ${currentUserId.uid}`);
      post.className = 'publicationSection';
      // B/C PRIVATE ESTATUS CAN ONLY BE SEEN BY THE CURRENT USER
      // console.log(`HOLA ${currentUserUid.uid} MI POST ES ${doc.data().status}`);
      post.innerHTML += `
                        <header>
                            <select id="publicOrPrivateSelector-${doc.data().id}" class="publicOrPrivateSelector">
                            <option value="public">${doc.data().visibility === 'private' ? 'Privado' : 'Publico'}</option>
                            <option value="private">${doc.data().visibility === 'public' ? 'Privado' : 'Publico'}</option>
                            </select>
                            <h1 class="nameTitlePublication">${doc.data().name} </h1>
                            <figure class="figureContainerIcons">
                              <input id="delete-${doc.data().id}" type="checkbox">
                              <label for="delete-${doc.data().id}">
                                  <img src="img/icons/trash.svg">
                              </label>
                            </figure>
                            <figure class="figureContainerIcons">
                              <input id="edit-${doc.data().id}" type="checkbox">
                              <label for="edit-${doc.data().id}">
                                  <img src="img/icons/modificar.svg">
                              </label>
                            </figure>
                        </header>
                        <section class="notes" id="content">
                        ${validatePost(doc.data().img, doc.data().status, doc.data().id)}
                            <textarea id="textareaEdit-${doc.data().id}" class="displayNone">${doc.data().status}</textarea>
                            <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                            <div class="notesIcons">
                            <button id="likeHeart" class="circle displayNone"><img src="img/icons/heart-solid.svg"></button>
                            <button id="likeHeart" class="circlePink displayNone"><img src="img/icons/comments.svg"></button>
                            <button id="btnSaveEdit-${doc.data().id}" class="cambioBtn">Guardar Cambio</button>
                            </div>
                        </section>      
                        `;
      statusPost.appendChild(post);
    }

    // agregando evento de click al btn eliminar un post
    const btnDeleted = statusPost.querySelector(`#delete-${doc.id}`);
    if (btnDeleted) {
      console.log(btnDeleted);

      btnDeleted.addEventListener('click', () => {
        deletePublication(doc.id);
      });
    }

    // FUNCIONES PARA EDITAR PUBLICACION
    const publicOrPrivateSelector = statusPost.querySelector(`#publicOrPrivateSelector-${doc.id}`);
    // const publicationSection = statusPost.querySelector(`#publicationSection-${doc.id}`);
    // console.log(publicOrPrivateSelector);
    if (publicOrPrivateSelector != null && doc.id === currentUserId.uid) {
      publicOrPrivateSelector.addEventListener('change', (e) => {
        e.preventDefault();
        changeVisibility(doc.id, publicOrPrivateSelector.value);
      });
    }

    const modificar = document.getElementById(`edit-${doc.id}`);
    const textareaEdit = document.getElementById(`textareaEdit-${doc.id}`);
    if (modificar) {
      console.log(modificar);

      // al hacer click en el boton del lapiz para editar publicacion
      modificar.addEventListener('click', (e) => {
        e.preventDefault();
        textareaEdit.classList.remove('displayNone');
        textareaEdit.focus();
      });
    }

    const btnEdit = document.getElementById(`btnSaveEdit-${doc.id}`);
    if (btnEdit) {
      console.log(btnEdit);

      // agregando evento de click al btn guardar cambio en la publicacion
      btnEdit.addEventListener('click', (e) => {
        e.preventDefault();
        editNote(doc.id, textareaEdit.value);
      });
    }
  });
  return statusPost;
};
