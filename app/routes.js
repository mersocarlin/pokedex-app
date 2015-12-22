import React from 'react';
import { Route } from 'react-router';

import App from './containers/app';
import Home from './containers/home';
import PokemonDetails from './containers/pokemon-details';
import NoMatch from './containers/no-match';


export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="pokemon/:pokemonId" component={PokemonDetails} />
    <Route path="*" component={NoMatch}/>
  </Route>
);
