export default () => {
  const menu = `
    <a class="link color" href="#/">
        <h1 class="not-margin">EducaChat</h1>
    </a>
    <nav>
        <ul class="menu flex">
            <li class="container-link">
                <a class="link color" href="#/catalogo">Catalogo de conejos</a>
            </li>
            <li class="container-link">
                <a class="link color" href="#/accesorios">Accesorios</a>
            </li>
            <li class="container-link">
                <a class="link color" href="#/lugares">Lugares de adopción</a>
            </li>
        </ul>
    </nav>
    `;
  const headerMenu = document.createElement('header');
  // divElemt.classList.add('position');
  headerMenu.innerHTML = menu;
  return headerMenu;
};
