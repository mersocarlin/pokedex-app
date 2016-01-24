import React from 'react';

import Col from './bootstrap/col';
import I from './font-awesome/i';
import PokemonName from './pokemon-name';


export default React.createClass({

  propTypes: {
    side   : React.PropTypes.string,
    onClick: React.PropTypes.func,
    pokemon: React.PropTypes.object
  },

  renderPagerLeft (side, pokemon) {
    if (side === "right") return;

    return (
      <div>
        <I icon="caret-left fa-2x" />
        <PokemonName id={pokemon.national_id} name={pokemon.name} />
      </div>
    );
  },

  renderPagerRight (side, pokemon) {
    if (side === "left") return;

    return (
      <div>
        <PokemonName id={pokemon.national_id} name={pokemon.name} />
        <I icon="caret-right fa-2x" />
      </div>
    );
  },

  render () {
    const { side, onClick, pokemon } = this.props;

    return (
      <div className={`pager-component ${side}`} onClick={onClick}>
        {this.renderPagerLeft(side, pokemon)}
        {this.renderPagerRight(side, pokemon)}
        <div className="clearfix"></div>
      </div>
    );
  }

});
