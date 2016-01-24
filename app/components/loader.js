import React from 'react';


export default React.createClass({

  render () {
    const { cssClass, text } = this.props;

    return (
      <div className="loader-component">
        <i className="icon icon-pokeball fa-spin">
        </i>
      </div>
    );
  }

});
