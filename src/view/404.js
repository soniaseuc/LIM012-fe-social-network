export default () => {
  const viewDifferent = `
            <figure>
            <img class="image" src="img/404.png" width="450px" height="250px" >
            </figure>
            <h1>OOPS!!</h1>
            <h2>Página no encontrada</h2>
            <p>El archivo especificado no se encontró en este sitio web.
            Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
            <a onclick="signIn()" id="SignIn" href="#/home">Volver página principal</a>
          `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'notFound');
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};
/*
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

*/
