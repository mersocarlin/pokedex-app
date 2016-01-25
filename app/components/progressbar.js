import React from 'react';


export default React.createClass({

  propTypes: {
    value: React.PropTypes.number,
  },

  getDefaultProps () {
    return {
      value: 100,
    };
  },

  render () {
    const { value } = this.props;
    const progressValue = (100 - value);
    const pbCssClass = `pb pb-${progressValue} fadeInUp animated`;

    return (
      <div className={`progressbar-component`}>
        <div className={pbCssClass}></div>
      </div>
    );
  },
});
