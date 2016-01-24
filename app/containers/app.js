import React from 'react';


import { Strings } from '../constants';


import { RouterMixins } from '../mixins';

import logo from '../img/logo.png';

export default React.createClass({

  mixins: [ RouterMixins ],

  handlerAppNameClick () {
    this.transitionTo("/");
  },

  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header" onClick={this.handlerAppNameClick}>
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
  },

});
