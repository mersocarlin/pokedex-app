import React from 'react';


import PokemonsActions from '../actions/pokemons';
import PokemonsStore from '../stores/pokemons';


import Button from '../components/bootstrap/button';
import Loader from '../components/loader';
import Col from '../components/bootstrap/col';
import Row from '../components/bootstrap/row';
import PokemonGrid from '../components/pokemon-grid';


import { Status, Strings } from '../constants';
import { FluxMixins, RouterMixins } from '../mixins';


export default React.createClass({

  mixins: [FluxMixins, RouterMixins],

    statics: {
      storeListeners: {
        'onPokemonsStoreChange': PokemonsStore
       },
    },

    getInitialState () {
      return PokemonsStore.getInitialState();
    },

    onPokemonsStoreChange () {
      const state = PokemonsStore.getState();

      let pokemonList = this.state.pokemonList || [];

      if (state.status === Status.Ok) {
        pokemonList = pokemonList.concat(state.pokemonList);
      }

      this.setState({
        pokemonList    : pokemonList,
        pendingPokemons: state.status === Status.Pending
      });
    },

    componentDidMount () {
      window.addEventListener("scroll", this.handleScroll);
      this.loadMore();
    },

    handleScroll () {
      if ((window.innerHeight + window.scrollY) < document.body.offsetHeight)
        return;

      const { pendingPokemons } = this.state;
      const currentPage = PokemonsStore.getCurrentPage();

      if (pendingPokemons || currentPage <= 1)
        return;

      this.loadMore()
    },

    loadMore () {
      const payload = {
        page: PokemonsStore.getCurrentPage()
      };

      this.executeAction(PokemonsActions.loadMore, payload);
    },

    handlePokemonClick (pokemon) {
      window.removeEventListener("scroll", this.handleScroll);
      this.transitionTo(`pokemon/${pokemon.national_id}`);
    },

    renderLoadMoreButton (page, pendingPokemons) {
      if (pendingPokemons || page > 1) return;

      return (
        <Row cssClass="row-load-more">
          <Col sm={12}>
            <Button cssClass="blue" text={Strings.home.loadMore} onClick={this.loadMore} />
          </Col>
        </Row>
      );
    },

    render () {
      const { pendingPokemons } = this.state;
      const page = PokemonsStore.getCurrentPage();
      const cssClass = `app-page page-home ${page == 0 ? "initial" : ""}`;

      return (
        <div className={cssClass}>
          <Row>
            <Col sm={12} cssClass="app-name">
              {Strings.app.name}
            </Col>
          </Row>
          <Row>
            <PokemonGrid list={this.state.pokemonList} onPokemonClick={this.handlePokemonClick} />
          </Row>
          {this.renderLoadMoreButton(page, pendingPokemons)}
          {pendingPokemons && <Loader />}
        </div>
      );
    }
});
