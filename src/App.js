import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h1>Welcome to Teasure Hunt</h1>
        <h3>Hunt for low price</h3>

        <p>Register now!
        Don't have an account? <Link to="/signup">Sign Up</Link>
        Already have an account?  <Link to="/">Sign in</Link>
        </p>

      </header>
    </div>
  );
}

export default App;
