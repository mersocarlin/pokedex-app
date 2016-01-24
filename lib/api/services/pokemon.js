const serviceUrl = 'api/v1/pokemon/';


export default class PokemonService {
  constructor(options) {
    this.api = options.api;
  }

  getPokemonById (baseUrl, payload) {
    const url = `${serviceUrl}${payload.id}`;
    const options = { baseUrl: baseUrl, accessToken: "", url: url };
    return this.api.get(options);
  }

  getDescription (baseUrl, payload) {
    const options = { baseUrl: baseUrl, accessToken: "", url: payload.url };
    return this.api.get(options);
  }
}
