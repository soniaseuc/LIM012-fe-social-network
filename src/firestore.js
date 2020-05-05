

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
  const statusPost = document.querySelector('#comentarios');
  console.log(statusPost);
  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {
        statusPost.innerHTML += `
        <header>
        <select id="" class="publicOrPrivateSelector">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <h1 class="nameTitlePublication">${doc.data().name}</h1>
        <figure class="figureContainerIcons"><img src="img/icons/trash.svg"></figure>
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
            `;
      });
    });
};

/**
 *  <div ${doc.id}>
              <p>${doc.data().status}</p>
            </div>
 *
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

// export const getStatus = () => {
//   const statusPost = document.querySelector('#publicationMainSection');
//   firebase.firestore().collection('post').orderBy('date', 'desc')
//     .onSnapshot((querySnapShot) => {
//       statusPost.innerHTML = '';
//       querySnapShot.forEach((doc) => {
//         statusPost.innerHTML += publicationCreated(doc.data().status, );
//       });
//     });
// };
*/
