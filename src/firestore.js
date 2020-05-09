

// eslint-disable-next-line max-len
// export const signIn = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
// export const logIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

// export const saveUsers = () => {
//   const user = firebase.auth().currentUser;
//   firebase.firestore().collection('users').doc(user.uid).set({
//     user: user.displayName,
//     avatar: user.photoURL,
//     uid: user.uid,
//     email: user.email,
//   });
// };

// export const googleLogin = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return firebase.auth().signInWithPopup(provider);
// };


// FUNCION QUE BORRA PUBLICACIONES
// export const deleteNote = () => firebase.firestore().collection('post').doc().delete();
const deleteNote = (e) => {
  // console.log(e.target.id);
  firebase.firestore().collection('post').doc(e.target.id).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// FUNCIÓN PARA ACTUALIZAR LOS POSTS
const editNote = (idDoc, statusEdited, uid) => {
  // console.log('evento click de editar');
  document.querySelector('#input-edit-note').value = statusEdited;
  const btnSaveEdit = document.querySelector('#btnSaveEdit');
  btnSaveEdit.onclick = () => {
    // console.log(idDoc.target.id);
    // console.log(idDoc.target.status);
    const washingtonRef = firebase.firestore().collection('post').doc(idDoc);

    const textEdited = document.querySelector('[placeholder="¿Que quieres compartir?"]').value;
    return washingtonRef.update({
      status: textEdited,
    })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
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
      console.log(docRef.visibility);
      console.log(docRef);
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


export const getStatus = () => {
  const mainElem = document.getElementById('mainElement');
  const statusPost = document.createElement('section');
  statusPost.setAttribute('id', 'comentarios');
  statusPost.classList.add('postSection');
  mainElem.appendChild(statusPost);
  // console.log(statusPost);

  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {
        statusPost.innerHTML += `
        <section class="publicationSection">
            <header>
                <select id="" class="publicOrPrivateSelector">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <h1 class="nameTitlePublication">${doc.data().name}</h1>
                <figure class="figureContainerIcons">
                  <input id="${doc.id}" type="checkbox">
                  <label for="${doc.id}">
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
                <p>${doc.data().id}</p>
                <p class="textComent" id="input-edit-note" >${doc.data().status}</p>
                <img alt=" " src="${doc.data().img}">
                <div class="notesIcons">
                <figure id="likeHeart"><img src="img/icons/heart-solid.svg"></figure>
                <figure id="comentIcon"><img src="img/icons/comments.svg"></figure>
                <button id="btnSaveEdit" ">Guardar Cambio</button>
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
        const currentUser = firebase.auth().currentUser.uid;

        // agregando evento de click al btn eliminar un post
        const btnDeleted = document.getElementById(doc.id);
        btnDeleted.onclick = deleteNote;
        // console.log('borrado exitosamente');
        // console.log(btnDeleted);

        // agregando evento de click al btn editar un post
        const btnEdit = document.getElementById(`edit-${doc.id}`);
        btnEdit.onclick = editNote(`${doc.id}`, `${doc.data().status}`, currentUser);
        // console.log(btnEdit);
        // onclick="EditNote(${doc.id}, ${doc.data().status})"
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
