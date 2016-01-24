import React from 'react';


import Col from './bootstrap/col';
import PokemonName from './pokemon-name';


import { config } from '../env';


export default React.createClass({

  propTypes: {
    details: React.PropTypes.bool,
    pokemon: React.PropTypes.object,
    onClick: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      details: false
    }
  },

  fillPokemonId (pokemon) {
    let id = pokemon.national_id.toString();
    while (id.length < 3) {
      id = `0${id}`;
    }

    return id;
  },

  renderHeader (pokemon) {

    return (
      <div className="header">
        <PokemonName id={pokemon.national_id} name={pokemon.name} />
      </div>
    );
  },

  renderBody (pokemon) {
    const imgUrl = `${config.pokemon.imageSmall}${this.fillPokemonId(pokemon)}.png`;

    return (
      <div className="body">
        <img className="img-responsive" src={imgUrl} />
      </div>
    );
  },

  renderFooter (pokemon) {
    if (!pokemon.types.length) return;

    return (
      <div className="footer">
        {
          pokemon.types.map((type, index) => {
            const cssClass = `type type-${type.name}` ;

            return (
              <Col key={index} xs={6} cssClass={cssClass}>
                {type.name}
              </Col>
            );
          })
        }
        <div className="clearfix"></div>
      </div>
    );
  },

  handleClick () {
    if (!this.props.onClick) return;

    const { pokemon } = this.props;

    this.props.onClick(pokemon);
  },

  render () {
    const { details, pokemon } = this.props;

    return (
      <div className="pokemon" onClick={this.handleClick}>
        {!details && this.renderHeader(pokemon)}
        {this.renderBody(pokemon)}
        {this.renderFooter(pokemon)}
      </div>
    )

  }

});
