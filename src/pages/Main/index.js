import Home from '../Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import './style.css';


function Main() {

  return (
    <div className='container'>
      <SignIn />
      <SignUp />
      <Home />
    </div>
  );
}

export default Main;
