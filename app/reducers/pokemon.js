import {
  POKEMON_REQUEST,
  POKEMON_SUCCESS,
  POKEMON_FAILURE,
  POKEMON_DESCRIPTION_REQUEST,
  POKEMON_DESCRIPTION_SUCCESS,
  POKEMON_DESCRIPTION_FAILURE,
} from '../actions/pokemon';


const INITIAL_STATE = {
  isFetchingPokemons: true,
  isFetchingDescription: false,
  description: null,
  didFetchDescription: false,
  error: null,
  current: null,
  previous: null,
  next: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POKEMON_REQUEST:
      return { ...INITIAL_STATE, isFetchingPokemons: true };
    case POKEMON_SUCCESS:
      const { data } = action;
      return {
        ...state,
        isFetchingPokemons: false,
        previous: data[0],
        current: data[1],
        next: data[2],
      };
    case POKEMON_FAILURE:
      return { ...state, isFetchingPokemons: false, error: action.error };
    case POKEMON_DESCRIPTION_REQUEST:
      return { ...state, isFetchingDescription: true, description: null };
    case POKEMON_DESCRIPTION_SUCCESS:
      const { data: result } = action;
      return {
        ...state,
        isFetchingDescription: false,
        description: result.description || '',
        didFetchDescription: true,
      };
    case POKEMON_DESCRIPTION_FAILURE:
      return {
        ...state,
        isFetchingDescription: false,
        didFetchDescription: true,
        error: action.error,
      };
    default:
      return state;
  }
};
