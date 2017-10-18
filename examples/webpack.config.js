'use-strict';

const path = require('path');


const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['react', 'es2015']
  }
};


module.exports = {
  entry: './index',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      babelLoader
    ]
  }
}