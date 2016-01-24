import FluxStore from './flux-store';
import { ActionTypes } from '../actions/pokemon';
import { Status } from '../constants';


class PokemonStore extends FluxStore {
  constructor () {
    super();

    this.bindActions(
      ActionTypes.GetPokemonByIdPending, this.onGetPokemonByIdPending,
      ActionTypes.GetPokemonByIdSuccess, this.onGetPokemonByIdSuccess,
      ActionTypes.GetPokemonByIdError, this.onGetPokemonByIdError,

      ActionTypes.GetPokemonDescriptionPending, this.onGetPokemonDescriptionPending,
      ActionTypes.GetPokemonDescriptionSuccess, this.onGetPokemonDescriptionSuccess,
      ActionTypes.GetPokemonDescriptionError, this.onGetPokemonDescriptionError
    );
  }

  getInitialState () {
    return {
      previousPokemon: {},
      currentPokemon: {},
      nextPokemon: {},
      error: null,
      pending: true,
      status: Status.Ok,
    };
  }

  onGetPokemonByIdPending () {
    this.setState({
      previousPokemon: {},
      currentPokemon: {},
      nextPokemon: {},
      pendingDescription: false,
      error: null,
      status: Status.Pending,
    });
  }

  onGetPokemonByIdSuccess (payload) {
    const data = payload.data;

    this.setState({
      previousPokemon: data[0],
      currentPokemon: data[1],
      nextPokemon: data[2],
      pendingDescription: true,
      error: null,
      status: Status.Ok,
    });
  }

  onGetPokemonByIdError (error) {
    this.setState({
      previousPokemon: null,
      currentPokemon: null,
      nextPokemon: null,
      pendingDescription: false,
      error,
      status: Status.Errors,
    });
  }

  onGetPokemonDescriptionPending () { }

  onGetPokemonDescriptionSuccess (payload) {
    this.setState({
      pendingDescription: false,
      pokemonDescription: payload.data,
    });
  }

  onGetPokemonDescriptionError (error) {
    this.setState({
      pendingDescription: false,
      pokemonDescription: '',
      error,
    });
  }
}


export default new PokemonStore();
