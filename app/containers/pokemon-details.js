import React from 'react';


import Button from '../components/bootstrap/button';
import Col from '../components/bootstrap/col';
import Progressbar from '../components/progressbar';
import Row from '../components/bootstrap/row';
import Loader from '../components/loader';
import Pager from '../components/pager';
import PokemonName from '../components/pokemon-name';
import Pokemon from '../components/pokemon';


import PokemonActions from '../actions/pokemon';
import PokemonStore from '../stores/pokemon';


import { Status, Strings } from '../constants';
import { FluxMixins, RouterMixins } from '../mixins';


export default React.createClass({

  mixins: [FluxMixins, RouterMixins],

  statics: {
    storeListeners: {
      'onPokemonStoreChange': PokemonStore,
    },
  },

  getInitialState () {
    return PokemonStore.getInitialState();
  },

  componentDidMount () {
    this.loadPage(this.props);
  },

  componentWillReceiveProps (nextProps) {
    this.loadPage(nextProps);
  },

  onPokemonStoreChange () {
    const state = PokemonStore.getState();

    this.setState({
      previousPokemon: state.previousPokemon,
      currentPokemon: state.currentPokemon,
      nextPokemon: state.nextPokemon,
      pokemonDescription: state.pokemonDescription,
      pending: state.status === Status.Pending,
    });

    if (!state.pendingDescription) return;

    const payload = {
      descriptions: state.currentPokemon.descriptions,
    };

    this.executeAction(PokemonActions.getDescription, payload);
  },

  loadPage (props) {
    const { params } = props;

    if (!params.pokemonId) return;

    const payload = {
      id: params.pokemonId,
    };

    this.executeAction(PokemonActions.getPokemonById, payload);
  },

  handlePagerClick (id) {
    this.transitionTo(`pokemon/${id}`);
  },

  renderHeader (previousPokemon, nextPokemon) {
    return (
      <Row cssClass="row-pager">
        <Col xs={6}>
          <Pager side="left" onClick={this.handlePagerClick.bind(null, previousPokemon.national_id)} pokemon={previousPokemon} />
        </Col>
        <Col xs={6}>
          <Pager side="right" onClick={this.handlePagerClick.bind(null, nextPokemon.national_id)} pokemon={nextPokemon} />
        </Col>
      </Row>
    );
  },

  renderDetails (pokemon) {
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
  },

  renderStats (pokemon) {
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
  },

  renderMoves (pokemon) {
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
  },

  renderExploreMore () {
    return (
      <Row cssClass="row-explore-more">
        <Col sm={12}>
          <Button cssClass="orange" text={Strings.pokemon.explore} onClick={() => this.transitionTo('/')} />
        </Col>
      </Row>
    );
  },

  render () {
    const {
      pending,
      previousPokemon,
      currentPokemon,
      nextPokemon,
      pokemonDescription } = this.state;

    if (pending) {
      return (
        <div className="app-page page-pokemon initial">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app-page page-pokemon fadeIn animated">
        {this.renderHeader(previousPokemon, nextPokemon)}
        <Row cssClass="row-name">
          <PokemonName id={currentPokemon.national_id} name={currentPokemon.name} />
        </Row>
        <Row>
          <Col xs={6}>
            <Pokemon details={true} pokemon={currentPokemon} />
            <div className="fadeIn animated">
              {pokemonDescription ? pokemonDescription.description : ''}
            </div>
          </Col>
          <Col xs={6}>
            {this.renderDetails(currentPokemon)}
            {this.renderStats(currentPokemon)}
          </Col>
        </Row>
        {this.renderMoves(currentPokemon)}
        {this.renderExploreMore()}
      </div>
    );
  },
});
