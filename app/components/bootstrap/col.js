import React from 'react';


export default React.createClass({

  propTypes: {
    cssClass: React.PropTypes.string,
    xs: React.PropTypes.number,
    sm: React.PropTypes.number,
    md: React.PropTypes.number,
    lg: React.PropTypes.number,
  },

  getDefaultProps () {
    return {
      cssClass: '',
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
    };
  },

  getCssClass () {
    const { cssClass } = this.props;

    const colCssClass = Object.keys(this.props).map(propName => {
      const propValue = this.props[propName];

      if (propValue > 0) {
        return `col-${propName}-${propValue}`;
      }
      return '';
    }).join(' ');

    return `col-component ${cssClass} ${colCssClass.trim()}`;
  },

  render () {
    const cssClass = this.getCssClass();

    return (
      <div className={cssClass}>
        {this.props.children}
      </div>
    );
  },
});
