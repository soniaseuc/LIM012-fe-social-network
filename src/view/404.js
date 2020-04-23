export default () => {
  const viewDifferent = `
            <figure>
            <img class="image" src="img/404.png">
            </figure>
            <h1>OOPS!!</h1>
            <h2>Página no encontrada</h2>
            <p>El archivo especificado no se encontró en este sitio web.
            Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
            <button>Volver página principal</button>
          `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};
