import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory';


import App from './containers/app';
import Home from './containers/home';
import PokemonDetails from './containers/pokemon-details';
import NoMatch from './containers/no-match';


let history = createHistory({
  queryKey: false
});

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route path="pokemon/:pokemonId" component={PokemonDetails} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
);
