import * as api from '../api/pokemon';
import { Config } from '../env';

export const POKEMONS_REQUEST = 'POKEMONS_REQUEST';
export const POKEMONS_SUCCESS = 'POKEMONS_SUCCESS';
export const POKEMONS_FAILURE = 'POKEMONS_FAILURE';
export const POKEMONS_RESET = 'POKEMONS_RESET';


export function fetchPokemons (page = 0) {
  return (dispatch) => {
    return dispatch(_fetchPokemons(page));
  };
}


export function resetPage () {
  return { type: POKEMONS_RESET };
}

function _fetchPokemons (page) {
  return async dispatch => {
    dispatch({ type: POKEMONS_REQUEST });
    try {
      const gridSize = Config.pokemon.gridSize;
      const maxId = Config.pokemon.maxId;
      const startIndex = page * gridSize;
      const pokemonIdList = [];

      for (let i = 1; i <= 16; i++) {
        pokemonIdList.push(startIndex + i);
      }

      Promise.all(
        pokemonIdList
          .filter(id => id <= maxId)
          .map(id => api.fetchPokemon(id))
        ).then(data => {
          dispatch({ type: POKEMONS_SUCCESS, data, page: page + 1 });
        });
    } catch (error) {
      dispatch({ type: POKEMONS_FAILURE, error });
    }
  };
}
