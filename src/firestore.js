// FUNCION QUE BORRA PUBLICACIONES
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
  document.querySelector('#input-edit-note').value = pElementToEdit;
  const textareaEdited = document.querySelector('#inputPost').value;
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
      console.log(`'currentUser.uid written with ID: ${uid}`);
      console.log(`'Document written with ID: ${docRef.id}`);
      // console.log(docRef.visibility);
      // console.log(docRef.id);
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

const validatePost = (img, post) => {
// B/C THERE WAS AN BROKEN IMG ON EACH PUBLISHED POST
  let postTemplate = '';
  if (img) {
    postTemplate = `
    <p class="textComent" id="input-edit-note">${post}</p>
    <textarea id="inputPost" class="displayNone">${post}</textarea>
    <img  class="postedImg" src="${img}">
    `;
  } else {
    postTemplate = `
    <p class="textComent" id="input-edit-note">${post}</p>
    <textarea id="inputPost" class="displayNone">${post}</textarea>
    `;
  }
  return postTemplate;
};


export const getStatus = () => {
  const mainElem = document.getElementById('mainElement');
  const statusPost = document.createElement('section');
  statusPost.setAttribute('id', 'comentarios');
  statusPost.classList.add('postSection');
  mainElem.appendChild(statusPost);

  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      const currentUserUid = firebase.auth().currentUser;
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {
       console.log(`post Id => ${doc.id} | usuario Id = ${doc.data().id}`);
        if (doc.data().visibility === 'public') {
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
                ${validatePost(doc.data().img, doc.data().status)}
                <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                <div class="notesIcons">
                <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                <button id="btnSaveEdit" class="cambioBtn">Guardar Cambio</button>
                </div>

                </div>
                <div class="line"></div>
                <input placeholder="Agrega tu Comentario"></input>
            </section>
                `;
          statusPost.appendChild(post);
        } if (doc.data().visibility === 'private' && doc.data().id === currentUserUid.uid) {
        // B/C PRIVATE ESTATUS CAN ONLY BE SEEN BY THE CURRENT USER
          console.log(`HOLA ${currentUserUid.uid} MI POST ES ${doc.data().status}`);
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
                    ${validatePost(doc.data().img, doc.data().status)}
                    <p class="softFont">Publicado ${doc.data().date.toDate()}</p>
                    <div class="notesIcons">
                    <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                    <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                    <button id="btnSaveEdit" class="cambioBtn">Guardar Cambio</button>
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
        console.log(btnDeleted);
        if (btnDeleted) {
          btnDeleted.addEventListener('click', () => {
            deletePublication(doc.id);
          });
        }

        // FUNCIONES PARA EDITAR PUBLICACION
        const modificar = statusPost.querySelector(`#edit-${doc.id}`);
        const post = statusPost.querySelector('#input-edit-note');
        const btnEdit = document.getElementById('btnSaveEdit');
        const inputPost = statusPost.querySelector('#inputPost');

        if (modificar) {
          // al hacer click en el boton del lapiz para editar publicacion
          modificar.addEventListener('click', () => {
            inputPost.classList.remove('displayNone');
            inputPost.focus();
          });
        }
        if (btnEdit) {
          // agregando evento de click al btn guardar cambio en la publicacion
          btnEdit.addEventListener('click', () => {
            editNote(doc.id, post.value);
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
