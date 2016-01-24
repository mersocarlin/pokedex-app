import React from 'react';


import Col from './bootstrap/col';
import Pokemon from './pokemon';


export default React.createClass({

  propTypes: {
    list          : React.PropTypes.array,
    onPokemonClick: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      list          : [],
      onPokemonClick: () => {}
    }
  },

  handlePokemonClick (pokemon) {
    this.props.onPokemonClick(pokemon);
  },

  render () {
    const { list } = this.props;

    return (
      <div className="pokemon-grid">
        {
          list.map((pokemon, index) => {
            return (
              <Col key={index} sm={3}>
                <Pokemon pokemon={pokemon} onClick={this.handlePokemonClick} />
              </Col>
            )
          })
        }
      </div>
    );
  }

});
