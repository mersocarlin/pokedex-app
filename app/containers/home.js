import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPokemons, resetPage } from '../actions/pokemons';
import { Strings } from '../constants';

import Button from '../components/bootstrap/button';
import Loader from '../components/loader';
import Col from '../components/bootstrap/col';
import Row from '../components/bootstrap/row';
import PokemonGrid from '../components/pokemon-grid';


class Home extends Component {
  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.loadMore(this.props);
  }

  componentWillUnmount () {
    this.props.dispatch(resetPage());
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll () {
    if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
      return;
    }

    const { pokemons } = this.props;
    const { isFetchingPokemons, page } = pokemons;

    if (isFetchingPokemons || page <= 1) {
      return;
    }

    this.loadMore(this.props);
  }

  loadMore ({ dispatch, pokemons }) {
    dispatch(fetchPokemons(pokemons.page));
  }

  handlePokemonClick (pokemon) {
    this.props.history.push(`pokemon/${pokemon.national_id}`);
  }

  renderLoadMoreButton ({ page, isFetchingPokemons }) {
    if (isFetchingPokemons || page > 1) return;

    return (
      <Row cssClass="row-load-more">
        <Col sm={12}>
          <Button
            cssClass="blue"
            text={Strings.home.loadMore}
            onClick={this.loadMore.bind(this, this.props)}
          />
        </Col>
      </Row>
    );
  }

  render () {
    const { pokemons } = this.props;
    const { isFetchingPokemons, list, page } = pokemons;
    const cssClass = `app-page page-home ${page === 0 ? 'initial' : ''}`;

    return (
      <div className={cssClass}>
        <Row>
          <Col sm={12} cssClass="app-name">
            {Strings.app.name}
          </Col>
        </Row>
        <Row>
          <PokemonGrid
            list={list}
            onPokemonClick={this.handlePokemonClick.bind(this)}
          />
        </Row>
        {this.renderLoadMoreButton(pokemons)}
        {isFetchingPokemons && <Loader />}
      </div>
    );
  }
}

export default connect(state => {
  return {
    pokemons: state.pokemons,
  };
})(Home);
