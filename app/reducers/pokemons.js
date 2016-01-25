import {
  POKEMONS_REQUEST,
  POKEMONS_SUCCESS,
  POKEMONS_FAILURE,
  POKEMONS_RESET,
} from '../actions/pokemons';


const INITIAL_STATE = {
  isFetchingPokemons: false,
  error: null,
  list: [],
  page: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POKEMONS_REQUEST:
      return { ...state, isFetchingPokemons: true };
    case POKEMONS_SUCCESS:
      const { list } = state;

      return {
        ...state,
        isFetchingPokemons: false,
        list: list.concat(action.data),
        page: action.page,
      };
    case POKEMONS_FAILURE:
      return { ...state, isFetchingPokemons: false, error: action.error };
    case POKEMONS_RESET:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
