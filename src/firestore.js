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


// export const deleteNote = () => firebase.firestore().collection('post').doc().delete();
export const deleteNote = (e) => {
  // console.log(e.target.id);
  firebase.firestore().collection('post').doc(e.target.id).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

/*
 *  CLOUD FIRESTORE FUNCTIONS
 */
export const publishStatus = (userName, statusPost) => {
  // Create a new collection and a document
  firebase.firestore().collection('post').add({
    name: userName,
    status: statusPost,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
  })
    .then((docRef) => {
      console.log(`'Document written with ID: ${docRef.id}`);
      console.log(docRef);
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
  console.log(statusPost);
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
                <figure class="figureContainerIcons"><img src="img/icons/trash.svg">
                <button id="${doc.id}">Borrar</button>
                </figure>
            </header>
            <section class="notes" id="content">
                <p class="textComent" id="statusPost">${doc.data().status}</p>
                <div class="notesIcons">
                <figure id="likeHeart"><img src="img/icons/heart-solid.svg"></figure>
                <figure id="comentIcon"><img src="img/icons/comments.svg"></figure>
                </div>
            </section>
            <section class="comment" id="comments">
                <div class="userComentDone">
                <div class="flexColumn">
                <h5>NOMBRE</h5>
                <p>Comentario......</p>
                </div>
                <div class="icons">
                    <figure><img src="img/icons/modificar.svg"></figure>
                    <figure><img src="img/icons/trash.svg"></figure>
                    <figure><img src="img/icons/heart-solid.svg"></figure>  
                </div>
                </div>
                <div class="line"><div>
                <input placeholder="Agrega tu Comentario"></input>
            </section>
        </section>
            `;
        // agregando evento de click al btn eliminar una nota
        const btnDeleted = document.getElementById(doc.id);
        btnDeleted.onclick = deleteNote;
        // console.log('borrado exitosamente');
        console.log(btnDeleted);
      });
    });
};
