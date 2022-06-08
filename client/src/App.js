import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/Details';
function App() {
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/pokemons'>
            <PokemonCreate />
          </Route>
          <Route exact path='/pokemons/:id'>
            <PokemonDetail />
          </Route>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
