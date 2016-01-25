import React from 'react';


export default React.createClass({

  propTypes: {
    cssClass: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      cssClass: '',
    };
  },

  render () {
    const { cssClass } = this.props;

    return (
      <div className={`row ${cssClass}`}>
        {this.props.children}
      </div>
    );
  },
});
