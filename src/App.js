import logo from './logo.svg';
import './App.css';
import MainComponent from './Components/MainComponent'
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>

          <Route exact path="/" name={"Main Page"} component  = {MainComponent} />

        </Switch>

      </HashRouter>  

    </div>
  );
}

export default App;
