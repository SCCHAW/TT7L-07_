
import './App.css';
import LoginSignup from './component/loginSignUp/LoginSignup';
import homepage from './component/pages/homepage';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
     <LoginSignup/>
     <div className='home'>
      <switch>
        <Route exact path="/home">
          <homepage/>
        </Route>
      </switch>
     </div>
    </div>
    </Router>
  );
}

export default App;
