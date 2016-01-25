import React, { Component } from 'react';
import { connect } from 'react-redux';


class NoMatch extends Component {
  render () {
    return (
      <div className="app-page page-no-match">
        Not Found!
      </div>
    );
  }
}


export default connect((/* state */) => {
  return {

  };
})(NoMatch);
