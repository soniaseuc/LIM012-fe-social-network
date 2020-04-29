
// eslint-disable-next-line max-len
export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
// promise.catch(e => alert(e.message));
// alert('Signed Up');
// };


// eslint-disable-next-line max-len
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
//   promise.catch(e => alert(e.message));

//   // otro tonto alert para probar. Lo quitaremos porque no es necesario
//   // window.alert(`email: ${email.value}, password ${password.value}`);
// };

export const signOut = () => {
  firebase.auth().signOut();
  //   .then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {

//     // An error happened.
//   });
  // alert('Signed Out');
};

// export const myCurrentUser = () => {
//   const user = firebase.auth().currentUser;
//   let email;
//   if (user != null) {
//   // User is signed in.
//     email = user.email;
//     console.log(`active user ${email}`);
//     // alert(`Active User ${email}`);
//   }
//   return firebase.auth().currentUser;
// };

export const authentification = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Take user to a different or home page
      // User is signed in
      // myCurrentUser();
      window.location.hash = '#/home';
    } else {
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};

// otra funcion solo para devolver el currentUser
// export const signInWithGoogle = () => {
//   // Create an instance of the Google provider object
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return firebase.auth().signInWithPopup(provider);
// };

// export const signInWithFacebook = () => {
// const provider = new firebase.auth.FacebookAuthProvider();
// return firebase.auth().signInWithPopup(provider);
// };
