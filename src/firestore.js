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
// export const getStatus = (list) => {
//   firebase.firestore().collection('post').orderBy('date', 'desc')
//     .onSnapshot((querySnapShot) => {
//       const data = [];
//       querySnapShot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       list(data);
//     });
// };
const validatePost = (img, post) => {
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
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().status}`);
        statusPost.innerHTML += `
        <section class="publicationSection">
            <header>
                <select id="" class="publicOrPrivateSelector">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <h1 class="nameTitlePublication">${doc.data().name} ${doc.data().id}</h1>
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
                <div class="notesIcons">
                <button id="likeHeart" class="circlePink"><img src="img/icons/heart-solid.svg"></button>
                <button id="likeHeart" class="circlePink"><img src="img/icons/comments.svg"></button>
                <button id="btnSaveEdit" class="cambioBtn" >Guardar Cambio</button>
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
        </section>
            `;
        // agregando evento de click al btn eliminar un post
        const btnDeleted = statusPost.querySelector(`#delete-${doc.id}`);
        btnDeleted.addEventListener('click', () => {
          deletePublication(doc.id);
        });

        // FUNCIONES PARA EDITAR PUBLICACION
        const modificar = statusPost.querySelector(`#edit-${doc.id}`);
        const post = statusPost.querySelector('#input-edit-note');
        const btnEdit = document.getElementById('btnSaveEdit');
        const inputPost = statusPost.querySelector('#inputPost');

        // al hacer click en el boton del lapiz para editar publicacion
        modificar.addEventListener('click', () => {
          inputPost.classList.remove('displayNone');
          inputPost.focus();
        });

        // agregando evento de click al btn guardar cambio en la publicacion
        btnEdit.addEventListener('click', () => {
          editNote(doc.id, post.value);
        });
      });
    });
};


// FIRESTORAGE

// const storage = firebase.storage();

export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  refStorage.put(file);
  console.log(`soy file de firestore.js ${file}`);
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
