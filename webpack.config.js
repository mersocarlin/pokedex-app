/* jshint node: true */
var path = require('path');
var webpack = require('webpack');


module.exports = {
  context: path.join(__dirname),
  entry: './app/index.js',

  output: {
    path: 'build',
    publicPath: 'build/',
    filename: 'app.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV'           : JSON.stringify(process.env.NODE_ENV || 'development'),
        'API_SERVICE_URL'    : JSON.stringify(process.env.API_SERVICE_URL || 'http://pokeapi.co/'),
        'LANGUAGE'           : JSON.stringify(process.env.LANGUAGE || 'en-US'),
        'POKEMON_MAX_ID'     : parseInt(process.env.POKEMON_MAX_ID || 718),
        'POKEMON_GRID_SIZE'  : parseInt(process.env.POKEMON_GRID_SIZE || 16),
        'POKEMON_IMAGE_LARGE': JSON.stringify(process.env.POKEMON_IMAGE_LARGE || 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'),
        'POKEMON_IMAGE_SMALL': JSON.stringify(process.env.POKEMON_IMAGE_SMALL || 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/')
      }
    }),
    new webpack.IgnorePlugin(/vertx/)
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&'
        + 'includePaths[]=' + (path.resolve(__dirname, './bower_components'))
        + '&'
        + 'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
