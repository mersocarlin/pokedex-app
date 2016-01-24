import React from 'react';


export default React.createClass({

  propTypes: {
    icon: React.PropTypes.string
  },

  render() {
    return <i className={`fa fa-fw fa-${this.props.icon}`}></i>;
  }

});
