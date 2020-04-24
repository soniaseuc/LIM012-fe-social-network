const navMenu = () => {
	const menu = `
    <a href="#/home">
        <h1>EducaChat</h1>
    </a>
    <nav>
        <ul>
            <li>
                <a href="#/profile">Perfil</a>
            </li>
            <li>
                <a href="#/">Cerrar Sesion</a>
            </li>
        </ul>
    </nav>
    `;
	const headerMenu = document.createElement('header');
	// divElemt.classList.add('position');
	headerMenu.innerHTML = menu;
	return headerMenu;
};

const avatarProfile = () => {
	const avatar = `
    <figure>
    <img class="image" src="img/avatar.png" width="100px" height="100px">
    </figure>
    <label>Fulanita</label>
    `;
	const sectionProfile = document.createElement('section');
	sectionProfile.innerHTML = avatar;
	return sectionProfile;
};

const mainPublication = () => {
	const publication = `
      <textarea placeholder="¿Que quieres compartir?"></textarea>
      <div>
      <input id="insertImg"></input>
      <label for="insertImg">
      <button>
      <img class="icons" src="img/icons/images.svg"  width="40px" height="50px" alt="">
      </button>
      </label>
      <select>
        <option default>Publico</option>
        <option>Privado</option>
      </select>
      <button>Compartir</button>
      </div>
      `;
	const sectionPublication = document.createElement('section');
	sectionPublication.innerHTML = publication;
	return sectionPublication;
};


export const hometemplate = () => {
	const mainElem = document.createElement('main');
	mainElem.appendChild(navMenu());
	mainElem.appendChild(avatarProfile());
	mainElem.appendChild(mainPublication());

	return mainElem;
};
