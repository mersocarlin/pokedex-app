import React from 'react';


export default React.createClass({

  propTypes: {
    cssClass: React.PropTypes.string,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      cssClass: '',
      text: '',
    };
  },

  handleButtonClick () {
    if (!this.props.onClick) return;

    this.props.onClick();
  },

  render () {
    const { cssClass, text } = this.props;

    return (
      <a className={`btn btn-default button-component ${cssClass}`} onClick={this.handleButtonClick} role="button">
        {text}
      </a>
    );
  },
});
