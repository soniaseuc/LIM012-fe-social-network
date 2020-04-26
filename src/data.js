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
  
const signUp = () => {
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));
	alert('Signed Up');
};

const signIn = () => {
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));

	// otro tonto alert para probar. Lo quitaremos porque no es necesario
	window.alert(`email: ${email.value}, password ${password.value}`);
};

const signOut = () => {
	auth.signOut();
	alert('Signed Out');
};

auth.onAuthStateChanged((user) => {
	if (user) {
		// Take user to a different or home page
		// User is signed in
		// const email = user.email;
		// alert(`Active User ${email}`);
		window.location.hash = '#/home';

		const user = firebase.auth().currentUser;
		// let name;
		let email;
		// let photoUrl; 
		// let uid;
		// let emailVerified;		
		if (user != null) {
		//   name = user.displayName;
			email = user.email;
			alert(`Active User ${email}`);
			//   photoUrl = user.photoURL;
			//   emailVerified = user.emailVerified;
			//   uid = user.uid;
			document.getElementById('myUserName').innerHTML = `Bienvenid@ usuari@: ${email}`;
		
		} else {
			alert('No Active User');
			// no user is signed in
			window.location.hash = '#/';
		}
	}});

// function signUp(){	
// 	var email = document.getElementById('email');	
// 	var password = document.getElementById('password');	
// 	const promise = auth.createUserWithEmailAndPassword(email.value, password.value);	
// 	promise.catch(e => alert(e.message));	
// 	alert('Signed Up');	
// }

// function signIn(){	
// 	var email = document.getElementById('email');	
// 	var password = document.getElementById('password');	
// 	const promise = auth.signInWithEmailAndPassword(email.value, password.value);	
// 	promise.catch(e => alert(e.message));	
// }

// function signOut(){
// 	auth.signOut();	
// 	alert('Signed Out');
// }

// auth.onAuthStateChanged(function(user){
// 	if(user){
// 		var email = user.email;
// 		alert('Active User ' + email);	
// 		//Take user to a different or home page	
// 		//is signed in
// 		window.location.hash = '#/home';
// 	}else{	
// 		alert('No Active User');
// 		window.location.hash = '#/';
// 		//no user is signed in	
// 	}	
// });