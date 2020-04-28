import SignUpform from './signUp.js';
import LogInform from './logIn.js';
import { homeTemplate } from './home.js';
// import Profile from './profile.js';
import Different from './404.js';


const components = {

  logInform: LogInform,
  signUpform: SignUpform,
  different: Different,
  home: homeTemplate,
};

export { components };
