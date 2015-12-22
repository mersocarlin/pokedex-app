import * as api from '../api/pokemon';
import { Config } from '../env';

export const POKEMON_REQUEST = 'POKEMON_REQUEST';
export const POKEMON_SUCCESS = 'POKEMON_SUCCESS';
export const POKEMON_FAILURE = 'POKEMON_FAILURE';

export const POKEMON_DESCRIPTION_REQUEST = 'POKEMON_DESCRIPTION_REQUEST';
export const POKEMON_DESCRIPTION_SUCCESS = 'POKEMON_DESCRIPTION_SUCCESS';
export const POKEMON_DESCRIPTION_FAILURE = 'POKEMON_DESCRIPTION_FAILURE';


export function fetchPokemon (id) {
  return (dispatch) => {
    return dispatch(_fetchPokemon(id));
  };
}


export function fetchDescription ({ descriptions }) {
  return (dispatch) => {
    return dispatch(_fetchDescription(descriptions));
  };
}


function _prepareIds (id) {
  let previousId = parseInt(id, 10) - 1;
  let nextId = parseInt(id, 10) + 1;

  if (previousId <= 0) {
    previousId = Config.pokemon.maxId;
  }

  if (nextId > Config.pokemon.maxId) {
    nextId = 1;
  }

  return { previousId, nextId };
}


function _fetchPokemon (currentId) {
  return async dispatch => {
    dispatch({ type: POKEMON_REQUEST });
    try {
      const { previousId, nextId } = _prepareIds(currentId);

      Promise.all([
        api.fetchPokemon(previousId),
        api.fetchPokemon(currentId),
        api.fetchPokemon(nextId),
      ]).then(data => {
        dispatch({ type: POKEMON_SUCCESS, data });
      });
    } catch (error) {
      dispatch({ type: POKEMON_FAILURE, error });
    }
  };
}


function _fetchDescription (descriptions) {
  return async dispatch => {
    dispatch({ type: POKEMON_DESCRIPTION_REQUEST });
    try {
      const url = descriptions[descriptions.length - 1].resource_uri;
      const data = await api.fetchPokemonDescription(url);
      dispatch({ type: POKEMON_DESCRIPTION_SUCCESS, data });
    } catch (error) {
      dispatch({ type: POKEMON_DESCRIPTION_FAILURE, error });
    }
  };
}

//
