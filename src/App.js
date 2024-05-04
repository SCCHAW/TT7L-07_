import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Maximum stock,get it now.
        </p>

        <h1>Welcome to Teasure Hunt</h1>
        <h2>Limited time only...</h2>

        <p>
          All you need is here! Low price, good quality only in here! Register Now !
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
