import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDescription, fetchPokemon } from '../actions/pokemon';
import { Strings } from '../constants';

import Button from '../components/bootstrap/button';
import Col from '../components/bootstrap/col';
import Progressbar from '../components/progressbar';
import Row from '../components/bootstrap/row';
import Loader from '../components/loader';
import Pager from '../components/pager';
import PokemonName from '../components/pokemon-name';
import Pokemon from '../components/pokemon';


class PokemonDetails extends Component {

  componentWillMount () {
    this.loadPage(this.props);
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch, params } = this.props;
    const { params: nextParams, pokemon: nextPokemon } = nextProps;

    if (params.pokemonId !== nextParams.pokemonId) {
      this.loadPage(nextProps);
      return;
    }

    if (nextProps.didFetchDescription) {
      return;
    }

    if (nextPokemon.current && !nextPokemon.description && !nextPokemon.isFetchingDescription) {
      dispatch(fetchDescription(nextPokemon.current));
    }
  }

  loadPage ({ params }) {
    this.props.dispatch(fetchPokemon(params.pokemonId));
  }

  handlePagerClick (id) {
    this.props.history.push(`pokemon/${id}`);
  }

  renderHeader ({ previous, next }) {
    return (
      <Row cssClass="row-pager">
        <Col xs={6}>
          <Pager
            side="left"
            onClick={this.handlePagerClick.bind(this, previous.national_id)}
            pokemon={previous}
          />
        </Col>
        <Col xs={6}>
          <Pager
            side="right"
            onClick={this.handlePagerClick.bind(this, next.national_id)}
            pokemon={next}
          />
        </Col>
      </Row>
    );
  }

  renderDetails ({ current: pokemon }) {
    return (
      <div className="details">
        <Row>
          <Col xs={6}>
            <h4>{Strings.pokemon.height}</h4>
            <span className="value">{pokemon.height / 10} m</span>
          </Col>
          <Col xs={6}>
            <h4>{Strings.pokemon.category}</h4>
            <span className="value">{pokemon.species}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h4>{Strings.pokemon.weight}</h4>
            <span className="value">{parseFloat(pokemon.weight) / 10} kg</span>
          </Col>
          <Col xs={6}>
            <h4>{Strings.pokemon.abilities}</h4>
            {
              pokemon.abilities.map((ability, index) => {
                return (
                  <div key={index}>
                    <span className="value">{ability.name}</span>
                  </div>
                );
              })
            }
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h4>{Strings.pokemon.gender}</h4>
            <span className="value">F / M</span>
          </Col>
        </Row>
      </div>
    );
  }

  renderStats ({ current: pokemon }) {
    const { stats } = Strings.pokemon;

    const divStats = Object.keys(stats)
      .map((stat, index) => {
        return (
          <div key={index} className="stat-info">
            <Progressbar value={pokemon[stat]} />
            <h4>{stats[stat]}</h4>
          </div>
        );
      });

    return (
      <div className="base-stats">
        <Row>
          <h4>{Strings.pokemon.baseStats} </h4>
          {divStats}
          <div className="clearfix"></div>
        </Row>
      </div>
    );
  }

  renderMoves ({ current: pokemon }) {
    let col = 0;
    let { moves } = pokemon;

    if (!moves.length) return;

    moves = moves
      .filter((move, index) => index <= 19)
      .map((move, index) => {
        if (col === 4) col = 0;

        const cssClass = `move col-${col++}`;

        return (
          <div key={index} className={cssClass}>
            {move.name}
            <div className="clearfix"></div>
          </div>
        );
      });

    return (
      <div className="moves">
        <h4>{Strings.pokemon.moves}</h4>
        {moves}
        <div className="clearfix"></div>
      </div>
    );
  }

  renderExploreMore () {
    return (
      <Row cssClass="row-explore-more">
        <Col sm={12}>
          <Button
            cssClass="orange"
            text={Strings.pokemon.explore}
            onClick={() => this.props.history.push('/')}
          />
        </Col>
      </Row>
    );
  }

  render () {
    const { pokemon } = this.props;
    const {
      isFetchingPokemons,
      isFetchingDescription,
      current,
      description,
    } = pokemon;

    if (isFetchingPokemons || isFetchingDescription) {
      return (
        <div className="app-page page-pokemon initial">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app-page page-pokemon fadeIn animated">
        {this.renderHeader(pokemon)}
        <Row cssClass="row-name">
          <PokemonName id={current.national_id} name={current.name} />
        </Row>
        <Row>
          <Col xs={6}>
            <Pokemon details={true} pokemon={current} />
            <div className="fadeIn animated">
              {description}
            </div>
          </Col>
          <Col xs={6}>
            {this.renderDetails(pokemon)}
            {this.renderStats(pokemon)}
          </Col>
        </Row>
        {this.renderMoves(pokemon)}
        {this.renderExploreMore()}
      </div>
    );
  }
}


export default connect((state) => {
  return {
    pokemon: state.pokemon,
  };
})(PokemonDetails);
