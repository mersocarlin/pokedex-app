import React from 'react';


export default React.createClass({

  propTypes: {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
  },

  fillPokemonId (pokemonId) {
    let id = pokemonId.toString();

    while (id.length < 3) {
      id = `0${id}`;
    }

    return `#${id}`;
  },

  renderHeader () {
    const { details, pokemon } = this.props;
    const id = `#${this.fillPokemonId()}`;

    if (details) return;

    return (
      <div className="header">
        {id} <span className="name">{pokemon.name}</span>
      </div>
    );
  },

  render () {
    const { id, name } = this.props;
    const filledId = this.fillPokemonId(id);

    return (
      <div className="pokemon-name">
        {filledId} <span className="name">{name}</span>
      </div>
    );
  },
});
