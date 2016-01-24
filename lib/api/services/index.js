import PokemonService from './pokemon';


export default function (options) {
  return {
    pokemon: new PokemonService(options)
  }
}
