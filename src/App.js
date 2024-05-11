import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h1>Welcome to Teasure Hunt</h1>
        <h3>Hunt for low price</h3>

        <p>Register now!</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign in Here
        </a>
      </header>
    </div>
  );
}

export default App;
