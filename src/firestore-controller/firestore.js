// FUNCION QUE BORRA PUBLICACIONES
// export const deletePublication = (e) => firebase.firestore().collection('post').doc(e).delete();
export const deletePublication = (e) => {
  // console.log(e.target.id);
  firebase.firestore().collection('post').doc(e).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// FIRESTORE STORAGE DELETE FILE
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


export const changeVisibility = (postId, value) => {
  firebase.firestore().collection('post').doc(postId).update({
    visibility: value,
  })
    .then(() => {
      console.log('Visibility successfully updated!');
    })
    .catch((error) => {
    // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};
/*
*  CLOUD FIRESTORE FUNCTIONS create publication
*/
// eslint-disable-next-line max-len
export const publishStatus = (userName, userEmail, statusPost, postDate, visibilityPost, imgPost, uid) => {
  // Create a new collection and a document
  firebase.firestore().collection('post').add({
    id: uid,
    name: userName,
    email: userEmail,
    status: statusPost,
    date: postDate,
    visibility: visibilityPost,
    img: imgPost,
  })
    .then((docRef) => {
      // console.log(uid);
      console.log(`'Document written with ID: ${docRef.id}`);
      // console.log(docRef.visibility);
      // console.log(docRef.id);
      // document.querySelector('[placeholder="¿Que quieres compartir?"]').value = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error adding document: ', errorCode);
      console.error('Error errorMessage adding document: ', errorMessage);
      return errorCode;
    });
};


// FUNCIÓN PARA ACTUALIZAR LOS POSTS
// eslint-disable-next-line max-len
// export const editNote = (idDoc, textarea) => firebase.firestore().collection('post').doc(idDoc).update({status: textarea});
export const editNote = (idDoc, textarea) => {
  // const textareaEdited = document.getElementById(`textareaEdit-${doc.id}`).value;
  firebase.firestore().collection('post').doc(idDoc).update({
    status: textarea,
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

/*
* READ DATABASE
*/
export const getStatus = (callback) => {
  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((doc) => {
        data.push(doc);
      });
      callback(data);
    });
};

// FIRESTORAGE
// const storage = firebase.storage();
export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  refStorage.put(file);
  // console.log(`soy file de firestore.js ${refStorage}`);
};

// const createTemp = () => {
//   const publicationSection = document.getElementsByClassName('publicationSection');
//   const header = document.createElement('header');
// };
