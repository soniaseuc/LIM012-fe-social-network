// export const data = () => {
// // aquí tu código
// };
const auth = firebase.auth();
export const authentification = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Take user to a different or home page
      // User is signed in
      const email = user.email;
      console.log(`active user ${email}`);
      alert(`Active User ${email}`);
      window.location.hash = '#/home';
    } else {
      alert('No Active User');
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};


export const signUp = (email, password) => {
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => alert(e.message));
  alert('Signed Up');
};


export const signIn = (email, password) => {
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => alert(e.message));

  // otro tonto alert para probar. Lo quitaremos porque no es necesario
  // window.alert(`email: ${email.value}, password ${password.value}`);
};

export const signOut = () => {
  auth.signOut();
  alert('Signed Out');
};


export const signInWithGoogle = () => {
const provider = new firebase.auth.GoogleAuthProvider();
return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
const provider = new firebase.auth.FacebookAuthProvider();
return firebase.auth().signInWithPopup(provider);
};
