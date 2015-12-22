import ApiClient from './api-client';

const serviceUrl = '/api/v1/pokemon/';


export async function fetchPokemon (id) {
  const options = { url: `${serviceUrl}${id}` };

  const { data } = await ApiClient.get(options);
  return data;
}


export async function fetchPokemonDescription (url) {
  const options = { url };

  const { data } = await ApiClient.get(options);
  return data;
}
