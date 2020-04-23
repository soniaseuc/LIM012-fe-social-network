export const navMenu = () => {
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

export const avatarProfile = () => {
  const avatar = `
    <figure>
    <img class="image" src="img/avatar.png">
    </figure>
    <label>Fulanita</label>
    `;
  const sectionProfile = document.createElement('secction');
  sectionProfile.innerHTML = avatar;
  return sectionProfile;
};

export const mainPublication = () => {
  const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div>
      <input id="insertImg"></input>
      <label for="insertImg">
      <img class="icons" src="../img/icons/images.svg" alt="">
      </label>
      <select>
        <option default>Publico</option>
        <option>Privado</option>
      </select>
      <button>Compartir</button>
      </div>
      `;
  const sectionPublication = document.createElement('secction');
  sectionPublication.innerHTML = publication;
  return sectionPublication;
};
