// FUNCION QUE BORRA PUBLICACIONES
// export const deleteNote = () => firebase.firestore().collection('post').doc().delete();
const deletePublication = (e) => {
  // console.log(e.target.id);
  firebase.firestore().collection('post').doc(e).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// firestore storage delete
// export const deleteImagePost = (file, uid) => {
//   // Create a reference to the file to delete
//   const desertRef = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
//   // Delete the file
//   desertRef.delete().then(() => {
//     // File deleted successfully
//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//     console.log(error.message);
//   });
// };


// FUNCIÓN PARA ACTUALIZAR LOS POSTS
const editNote = (idDoc, pElementToEdit) => {
  console.log('dentro de la funcion editNote');
  document.querySelector('#input-edit-note').value = pElementToEdit;
  const textareaEdited = document.querySelector(`#inputPost-${idDoc}`).value;
  firebase.firestore().collection('post').doc(idDoc).update({
    status: textareaEdited,
    // img: file,
  })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

const changeVisibility = (postId, value) => {
  console.log(` changeVisibility postId = ${postId}`);
  console.log(`changeVisibility value = ${value}`);
  firebase.firestore().collection('post').doc(postId).update({
    visibility: value,
  });
};

// eslint-disable-next-line max-len
// const editNote = (textEditNote, objNote) => firebase.firestore().collection('post').doc(objNote.id).update({
//   title: textEditNote,
// });

// const editNoteOnSubmit = (objNote) => {
//   const input = document.getElementById('input-edit-note');
//   editNote(input.value, objNote)
//     .then(() => {
//       console.log('Document successfully updated');
//       //  data.message = 'Nota agregada';
//     }).catch((error) => {
//       console.error('Error updating document: ', error);
//       //  data.message = 'Lo sentimos, no se pudo agregar la nota';
//     });
// };

// // agregando evento click al btn pen para editar
// divElement.querySelector(`#btn-pen-${objNote.id}`)
//   .addEventListener('click', () => {
//     const post = document.querySelector(`#texto-post-${objNote.id}`);
//     post.innerHTML = `
//       <div class="">
//         <textarea id="input-edit-note"></textarea>
//         <button id="btn-edit-${objNote.id}">Guardar cambios</button>
//         <button id="cancel">Cancelar</button>
//       </div>
//       `;
//     console.log(post.querySelector(`#btn-edit-${objNote.id}`));

//     post.querySelector('#input-edit-note').value = objNote.title;
//     // agregando evento click al btn editar nota
//     post.querySelector(`#btn-edit-${objNote.id}`)
//       .addEventListener('click', () => editNoteOnSubmit(objNote));
//     return post;
//   });

// eslint-disable-next-line max-len
// const updatePosts = (idpost, textPost) => firebase.firestore().collection('posts').doc(idpost).update({ post: textPost });


// Create an initial document to update.
// const frankDocRef = db.collection('users').doc('frank');
// frankDocRef.set({
//   name: 'Frank',
//   favorites: { food: 'Pizza', color: 'Blue', subject: 'recess' },
//   age: 12,
// });

// To update age and favorite color:
// db.collection('users').doc('frank').update({
//   age: 13,
//   'favorites.color': 'Red',
// })
//   .then(() => {
//     console.log('Document successfully updated!');
//   });

/*
*  CLOUD FIRESTORE FUNCTIONS
*/
export const publishStatus = (userName, statusPost, visibilityPost, imgPost, uid) => {
  // Create a new collection and a document
  firebase.firestore().collection('post').add({
    id: uid,
    name: userName,
    email: firebase.auth().currentUser.email,
    status: statusPost,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    visibility: visibilityPost,
    img: imgPost,
  })
    .then((docRef) => {
      console.log(uid);
      console.log(`'Document written with ID: ${docRef.id}`);
      // console.log(docRef.visibility);
      console.log(docRef.id);
      document.querySelector('[placeholder="¿Que quieres compartir?"]').value = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error adding document: ', errorCode);
      console.error('Error errorMessage adding document: ', errorMessage);
      return errorCode;
    });
};

/*
* READ DATABASE
*/

const validatePost = (img, post, idDoc) => {
// B/C THERE WAS AN BROKEN IMG ON EACH PUBLISHED POST
  let postTemplate = '';
  if (img) {
    postTemplate = `
    <p class="textComent" id="input-edit-note">${post}</p>
    <textarea id="inputPost-${idDoc}" class="displayNone">${post}</textarea>
    <img  class="postedImg" src="${img}">
    `;
  } else {
    postTemplate = `
    <p class="textComent" id="input-edit-note">${post}</p>
    <textarea id="inputPost-${idDoc}" class="displayNone">${post}</textarea>
    `;
  }
  return postTemplate;
};

// FUNCION PARA MOSTRAR EL BOTON EDITAR Y ELIMINAR CUANDO ES PUBLICO
// ${ifPublicButMine(doc.id, doc.data().id)}
// PORQUE ANTES SOLO MOSTRABA ESOS BOTONES CUANDO ERA PRIVADO
// const ifPublicButMine = (doc, userId) => {
//   console.log('dentro de ifPublivButMine');
//   const postDeleteEdit = document.getElementById('ifPublicButMine');
//   const currentUserUid = firebase.auth().currentUser;
//   // const postDeleteEdit = document.createElement('section');
//   // postDeleteEdit.innerHTML = '';
//   console.log(`${userId} =?= ${currentUserUid.uid}`);
//   if (userId === currentUserUid.uid) {
//     console.log(`dentro de ${userId} == ${currentUserUid.uid}`);
//     const post = document.createElement('section');
//     post.innerHTML += `
//     <figure class="figureContainerIcons">
//     <input id="delete-${doc.id}" type="checkbox">
//     <label for="delete-${doc.id}">
//         <img src="img/icons/trash.svg">
//     </label>
//   </figure>
//   <figure class="figureContainerIcons">
//     <input id="edit-${doc.id}" type="checkbox">
//     <label for="edit-${doc.id}">
//         <img src="img/icons/modificar.svg">
//     </label>
//   </figure>
//   `;
//     postDeleteEdit.innerHTML = post;
//   } else {
//     console.log('dentro del else ifPublicButMine');
//     // postDeleteEdit.innerHTML = '';
//   }
//   return postDeleteEdit;
// };

export const getStatus = () => {
  const mainElem = document.getElementById('mainElement');
  const statusPost = document.createElement('section');
  statusPost.setAttribute('id', 'comentarios');
  statusPost.classList.add('postSection');
  mainElem.appendChild(statusPost);
  const currentUserUid = firebase.auth().currentUser;
  console.log(currentUserUid);
  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
    // const currentUserUid = firebase.auth().currentUser;
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {        
        console.log(`postId = ${doc.id} | usuerId = ${doc.data().id} | status: ${doc.data().status}`);
        if (doc.data().visibility === 'public' && doc.data().id !== currentUserUid.uid) {
        // B/C PUBLIC STATUS SHOULD BE DISPLAY TO EVERYONE
          const post = document.createElement('section');
          post.className = 'publicationSection';

          post.innerHTML += `

            <header>
                <select id="" class="publicOrPrivateSelector">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <h1 class="nameTitlePublication">${doc.data().name} </h1>
                <div id="ifPublicButMine"></div>
            </header>

            <section class="notes" id="content">
                ${validatePost(doc.data().img, doc.data().status, doc.id)}
                <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                <div class="notesIcons">
                <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                </div>
            </section>
            <section class="comment" id="comments">
                    <div class="userComentDone">
                      <div class="flexColumn">
                        <h5>NOMBRE</h5>
                        <p>Comentario......</p>
                      </div>
                      <div class="icons">
                        <button id="likeHeart" class="circlePink"><img src="img/icons/modificar.svg"></button>
                        <button id="likeHeart" class="circlePink"><img src="img/icons/trash.svg"></button>
                        <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                      </div>
                    </div>
                    <div class="line">
                    </div>
                    <input placeholder="Agrega tu Comentario"></input>
                </section>
                `;
          statusPost.appendChild(post);
        } if (doc.data().visibility === 'private' && doc.data().id === currentUserUid.uid) {
        // B/C PRIVATE ESTATUS CAN ONLY BE SEEN BY THE CURRENT USER
          // console.log(`HOLA ${currentUserUid.uid} MI POST ES ${doc.data().status}`);
          const post = document.createElement('section');
          post.className = 'publicationSection';
          post.innerHTML += `
                <header>
                    <select id="" class="publicOrPrivateSelector">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <h1 class="nameTitlePublication">${doc.data().name} </h1>
                    <figure class="figureContainerIcons">
                      <input id="delete-${doc.id}" type="checkbox">
                      <label for="delete-${doc.id}">
                          <img src="img/icons/trash.svg">
                      </label>
                    </figure>
                    <figure class="figureContainerIcons">
                      <input id="edit-${doc.id}" type="checkbox">
                      <label for="edit-${doc.id}">
                          <img src="img/icons/modificar.svg">
                      </label>
                    </figure>
                </header>
                <section class="notes" id="content">
                    ${validatePost(doc.data().img, doc.data().status, doc.id)}
                    <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                    <div class="notesIcons">
                    <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                    <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                    <button id="btnSaveEdit-${doc.id}" class="cambioBtn">Guardar Cambio</button>
                    </div>
                </section>
                <section class="comment" id="comments">
                    <div class="userComentDone">
                      <div class="flexColumn">
                        <h5>NOMBRE</h5>
                        <p>Comentario......</p>
                      </div>
                      <div class="icons">
                        <button id="likeHeart" class="circlePink"><img src="img/icons/modificar.svg"></button>
                        <button id="likeHeart" class="circlePink"><img src="img/icons/trash.svg"></button>
                        <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                      </div>
                    </div>
                    <div class="line">
                    </div>
                    <input placeholder="Agrega tu Comentario"></input>
                </section>
                `;
          statusPost.appendChild(post);
        } if (doc.data().visibility === 'public' && doc.data().id === currentUserUid.uid) {
          // B/C PRIVATE ESTATUS CAN ONLY BE SEEN BY THE CURRENT USER
          // console.log(`HOLA ${currentUserUid.uid} MI POST ES ${doc.data().status}`);
          const post = document.createElement('section');
          post.className = 'publicationSection';

          post.innerHTML += `

                  <header>
                      <select id="" class="publicOrPrivateSelector">
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                      </select>
                      <h1 class="nameTitlePublication">${doc.data().name} </h1>
                      <figure class="figureContainerIcons">
                        <input id="delete-${doc.id}" type="checkbox">
                        <label for="delete-${doc.id}">
                            <img src="img/icons/trash.svg">
                        </label>
                      </figure>
                      <figure class="figureContainerIcons">
                        <input id="edit-${doc.id}" type="checkbox">
                        <label for="edit-${doc.id}">
                            <img src="img/icons/modificar.svg">
                        </label>
                      </figure>
                  </header>
                  <section class="notes" id="content">
                      ${validatePost(doc.data().img, doc.data().status, doc.id)}
                      <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                      <div class="notesIcons">
                      <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                      <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                      <button id="btnSaveEdit-${doc.id}" class="cambioBtn">Guardar Cambio</button>
                      </div>
                  </section>
                  <section class="comment" id="comments">
                      <div class="userComentDone">
                        <div class="flexColumn">
                          <h5>NOMBRE</h5>
                          <p>Comentario......</p>
                        </div>
                        <div class="icons">
                          <button id="likeHeart" class="circlePink"><img src="img/icons/modificar.svg"></button>
                          <button id="likeHeart" class="circlePink"><img src="img/icons/trash.svg"></button>
                          <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                        </div>
                      </div>
                      <div class="line">
                      </div>
                      <input placeholder="Agrega tu Comentario"></input>
                  </section>
                  `;
          statusPost.appendChild(post);
        }
        // agregando evento de click al btn eliminar un post
        const btnDeleted = statusPost.querySelector(`#delete-${doc.id}`);
       if (btnDeleted) {
          // console.log(btnDeleted);
          btnDeleted.addEventListener('click', () => {
            deletePublication(doc.id);
          });
        }
        // FUNCIONES PARA EDITAR PUBLICACION
        const modificar = statusPost.querySelector(`#edit-${doc.id}`);
        const post = statusPost.querySelector('#input-edit-note');
        const btnEdit = document.getElementById(`btnSaveEdit-${doc.id}`);
        const inputPost = statusPost.getElementById(`inputPost-${idDoc}`);
        const publicOrPrivateSelector = statusPost.querySelector('.publicOrPrivateSelector');
        // console.log(publicOrPrivateSelector);
        if (publicOrPrivateSelector != null && doc.data().id === currentUserUid.uid) {
          publicOrPrivateSelector.addEventListener('change', (e) => {
            e.preventDefault();
            changeVisibility(doc.id, publicOrPrivateSelector.value)
              .then(() => {
                console.log(`post Id => ${doc.id} | usuario Id = ${doc.data().id} === ${doc.data().name}`);
              });
          });
        }

        if (modificar) {
          console.log(modificar);
          // al hacer click en el boton del lapiz para editar publicacion
          modificar.addEventListener('click', () => {
            inputPost.classList.remove('displayNone');
            inputPost.focus();
          });
        }
        if (btnEdit) {
          console.log(btnEdit);
          // agregando evento de click al btn guardar cambio en la publicacion
          btnEdit.addEventListener('click', () => {
            editNote(`${doc.id}`, post.value);
          });
        }
      });
    });
};


// FIRESTORAGE

// const storage = firebase.storage();

export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  refStorage.put(file);
  console.log(`soy file de firestore.js ${refStorage}`);
};

// const createTemp = () => {
//   const publicationSection = document.getElementsByClassName('publicationSection');
//   const header = document.createElement('header');

// };

/**
    <section class="notes" id="content">
    <p class="textComent" id="input-edit-note">${doc.data().status}</p>
        <img src="${doc.data().img}">
            <div class="notesIcons">
                <figure id="likeHeart"><img src="img/icons/heart-solid.svg"></figure>
                <figure id="comentIcon"><img src="img/icons/comments.svg"></figure>
            <button id="boton" ">Guardar Cambio</button>
            </div>
    </section>
///---------- si no img-------///
     <p class="textComent" id="input-edit-note">${doc.data().status}</p>
 */
