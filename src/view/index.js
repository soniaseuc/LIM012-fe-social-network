import SignUpform from './signUp.js';
import LogInform from './logIn.js';
import { homeTemplate } from './home.js';
import { profileTemplate } from './profile.js';
import Different from './404.js';


const components = {
  logInform: LogInform,
  signUpform: SignUpform,
  different: Different,
  home: homeTemplate,
  profile: profileTemplate,
};

export { components };
