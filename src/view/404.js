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
<<<<<<< HEAD
  divElemt.setAttribute('id', 'notFound');
=======
  divElemt.setAttribute('class', 'divNotFound');
>>>>>>> 9517ae6985d9615bfa826612c78d3658807e2eae
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};
