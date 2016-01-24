import keyMirror from 'keymirror';


import ApiService from '../../lib/api';
import Dispatcher from '../dispatcher/dispatcher';
import { config } from '../env';


export const ActionTypes = keyMirror({
  GetPokemonsPending: null,
  GetPokemonsSuccess: null,
  GetPokemonsError: null,
}, 'Pokemons:');


export default {
  loadMore (payload) {
    const { page } = payload;
    const gridSize = config.pokemon.gridSize;
    const maxId = config.pokemon.maxId;
    const startIndex = page * gridSize;
    const pokemonIdList = [];

    for (let i = 1; i <= 16; i++) {
      pokemonIdList.push(startIndex + i);
    }

    Dispatcher.dispatch(ActionTypes.GetPokemonsPending);
    Promise.all(
      pokemonIdList
        .filter(id => id <= maxId)
        .map(id => {
          return ApiService
            .services
            .pokemon
              .getPokemonById(config.apiService.url, { id });
        })
      ).then(response => {
        const resp = response.map(r => r.data);
        Dispatcher.dispatch(ActionTypes.GetPokemonsSuccess, resp);
      });
  },
};
