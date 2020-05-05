

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
  const statusPost = document.querySelector('#statusPost');
  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapShot) => {
      statusPost.innerHTML = '';
      querySnapShot.forEach((doc) => {
        statusPost.innerHTML += `
            <div ${doc.id}>
              <p>${doc.data().status}</p>
            </div>
            `;
      });
    });
};

/**
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
