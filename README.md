# FE challenge v1


This is the technical README of my implementation for this challenge.

In this project I'm using the following technologies/techniques/frameworks:

- [Babel](https://babeljs.io/) for transpiling ES6 into ES5 code
- [ReactJS](https://facebook.github.io/react/) for building all the UI
- [Flux](https://facebook.github.io/flux/) architecture for complementing React
- [Axios](https://github.com/mzabriskie/axios) as promised based HTTP client to fetch data from [pokéapi](http://pokeapi.co)
- [Bootstrap](http://getbootstrap.com/) as front-end framework
- [Webpack](https://webpack.github.io/) as module bundler
- [Sass](http://sass-lang.com/) as CSS extension
- My machine is running node v5.0.0 and npm v3.4.0
- All my commit messages are in the imperative mood as described by [Chris Beams](http://chris.beams.io/posts/git-commit/)

## Implementation


### UI

Everything you see on the browser is a React component. Which means that it is pretty easy to reuse code and render all the Pokémon at once in the page. My "hardest" work, I should say, was fetch the data and understand a little bit about Pokémon.

### Fetching data

Flux basically works with 3 parts: Dispatcher, Stores and Views (here described as React components).
To fetch the data, a call to an action is performed and as soon as it is finished, the data is passed through a **Dispatcher** which knows exactly the **Store** that is currently "listening" to the event. The Store then updates the state of the **View** which is responsible for managing all the views within the UI.


#### Action

```js
export default MyAction {
  executeAndFetchMyData () {
    callTheApi(/* parameters */)
      .then(response => DispatchMyDataToTheStore(response))
      .catch(err => /* throw the error */);
  }
}
```

#### Store

```js
class MyStore {
  onMyDataIsReadyToGo(data) {
    this.setState({
      myData: data
    });
  }
}

export default new MyStore();
```

#### View (React component)

```js
export default React.createClass({

  componentDidMount () {
    /* Call to action is performed here */
    MyAction.executeAndFetchMyData();
  },

  onMyStoreChanged () {
    /* As soon as I get the result, I'm notified here */
    const newState = MyStore.getState();

    this.setState({
      myData: newState.myData
    });
  },

  render () {
    /* render my component */
  }

})
```

## Problems and Issues

- I couldn't understand exactly how to fetch or where is the Pokémon category
- I'm not so sure about the description and games *(It is probably wrong)*
- As I'm not a big fan, I really don't know nothing about Pokémon ;)

## Improvements

- Error handling: bad connection, server/api down..
- Tests: I'm not so sure about how to test front-end (or if it is necessary)
- It wasn't part of this challenge, but the the app could be responsive
