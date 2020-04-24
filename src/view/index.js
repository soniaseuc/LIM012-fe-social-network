import SignUpform from './signUp.js';
import LogInform from './logIn.js';
import { navMenu, avatarProfile, mainPublication } from './home.js';
// import Profile from './profile.js';
import Different from './404.js';


const components = {
  logInform: LogInform,
  signUpform: SignUpform,
  different: Different,
  home: [navMenu, avatarProfile, mainPublication],

};

export { components };
