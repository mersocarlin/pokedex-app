import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Strings } from '../constants';
import logo from '../img/logo.png';


class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  handlerAppNameClick () {
    this.props.history.push('/');
  }

  render () {
    return (
      <div className="app">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header" onClick={this.handlerAppNameClick.bind(this)}>
              <a className="navbar-brand">
                <img alt="Brand" src={logo}/>
              </a>
              <p className="navbar-text">{Strings.app.name}</p>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


function mapStateToProps (/* state */) {
  return {};
}


export default connect(mapStateToProps)(App);
