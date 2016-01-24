import APIClient from './api-client';
import services from './services';


class SDK {
  constructor() {
    this.api = new APIClient({ baseUrl: null });
    this.services = services({ api: this.api });
  }
}


export default new SDK();
