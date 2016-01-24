import request from 'axios';


export default class ApiClient {
  constructor (config) {
    this.baseUrl = config.baseUrl;
  }

  get (options) {
    return this.request(options);
  }

  request (options) {
    options.url = (options.baseUrl || this.baseUrl || '') + (options.url || '');
    options.headers = options.headers || {};

    return request(options)
      .then(response => {
        return this.parseResult(response);
      }.bind(this), function(err) {
        throw err;
      });
  }

  parseResult (body) {
    try {
      return typeof body === 'string' ? JSON.parse(body) : body;
    } catch (e) {
      return body;
    }
  }
}
