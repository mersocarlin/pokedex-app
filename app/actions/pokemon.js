import keyMirror from 'keymirror';


import ApiService from '../../lib/api';
import Dispatcher from '../dispatcher/dispatcher';
import { config } from '../env';


export const ActionTypes = keyMirror({
  GetPokemonByIdPending: null,
  GetPokemonByIdSuccess: null,
  GetPokemonByIdError: null,

  GetPokemonDescriptionPending: null,
  GetPokemonDescriptionSuccess: null,
  GetPokemonDescriptionError: null,
}, 'Pokemon:');


export default {
  getPokemonById (payload) {
    let previousId = parseInt(payload.id, 10) - 1;
    let nextId = parseInt(payload.id, 10) + 1;

    if (previousId <= 0) {
      previousId = config.pokemon.maxId;
    }

    if (nextId > config.pokemon.maxId) {
      nextId = 1;
    }
    Dispatcher.dispatch(ActionTypes.GetPokemonByIdPending);

    Promise.all([
      // previous
      ApiService.services.pokemon.getPokemonById(config.apiService.url, { id: previousId }),
      // current
      ApiService.services.pokemon.getPokemonById(config.apiService.url, payload),
      // next
      ApiService.services.pokemon.getPokemonById(config.apiService.url, { id: nextId }),
    ]).then(response => {
      const resp = response.map(r => r.data);
      Dispatcher.dispatch(ActionTypes.GetPokemonByIdSuccess, resp);
    });
  },

  getDescription (payload) {
    const url = payload.descriptions[payload.descriptions.length - 1].resource_uri;

    Dispatcher.dispatch(ActionTypes.GetPokemonDescriptionPending);

    ApiService.services.pokemon.getDescription(config.apiService.url, { url })
      .then(response => {
        Dispatcher.dispatch(ActionTypes.GetPokemonDescriptionSuccess, response.data);
      })
      .catch(err => {
        Dispatcher.dispatch(ActionTypes.GetPokemonDescriptionError, err);
      });
  },
};
