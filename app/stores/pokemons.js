import FluxStore from './flux-store';
import { ActionTypes } from '../actions/pokemons';
import { Status } from '../constants';


class PokemonsStore extends FluxStore {
  constructor() {
    super();

    this.bindActions(
      ActionTypes.GetPokemonsPending, this.onGetPokemonsPending,
      ActionTypes.GetPokemonsSuccess, this.onGetPokemonsSuccess,
      ActionTypes.GetPokemonsError  , this.onGetPokemonsError
    );
  }

  getInitialState () {
    this.resetPage();

    return {
      pokemonList: [],
      error          : null,
      pendingPokemons: true,
      status         : Status.Ok
    };
  }

  resetPage () {
    localStorage.pokedexPage = 0;
  }

  updatePage () {
    const currentPage = this.getCurrentPage();
    localStorage.pokedexPage = currentPage + 1;
  }

  getCurrentPage () {
    return parseInt(localStorage.pokedexPage || 0);
  }

  onGetPokemonsPending () {
    this.setState({
      pokemonList: [],
      error      : null,
      status     : Status.Pending
    });
  }

  onGetPokemonsSuccess (payload) {
    this.updatePage();
    this.setState({
      pokemonList: payload.data,
      error      : null,
      status     : Status.Ok
    });
  }

  onGetPokemonsError (error) {
    this.setState({
      pokemonList: null,
      error      : error,
      status     : Status.Errors
    });
  }
}


export default new PokemonsStore();
