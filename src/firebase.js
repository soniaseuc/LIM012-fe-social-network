// export const data = () => {
// 	// aquí tu código
// };

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyCeNrkvdzWB6_ox2aAbSB_RcooqZzS4KHc',
	authDomain: 'social-network-a68c0.firebaseapp.com',
	databaseURL: 'https://social-network-a68c0.firebaseio.com',
	projectId: 'social-network-a68c0',
	storageBucket: 'social-network-a68c0.appspot.com',
	messagingSenderId: '427677359698',
	appId: '1:427677359698:web:27d4064d69fbe191ed898b'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

  
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

// export const signInWithGoogle = () => {
// 	const provider = new firebase.auth.GoogleAuthProvider();
// 	return firebase.auth().signInWithPopup(provider);
// };
  
// export const signInWithFacebook = () => {
// 	const provider = new firebase.auth.FacebookAuthProvider();
// 	return firebase.auth().signInWithPopup(provider);
// };
