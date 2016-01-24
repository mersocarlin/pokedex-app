import { Router } from 'react-router';


export default {
  transitionTo (route, query) {
    this.props.history.push({
      pathname: route,
      query: {
        //the: 'query'
        query
      }
    });
  }
};
