'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'react']
  }
};


const svgLoader = {
  test: /\.svg$/,
  exclude: /node_modules/,
  loader: 'svg-react-loader'
};


const fontLoader = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  exclude: /src/,
  loader: 'url-loader?limit=100000'
};


const styleLoader = sourceMaps => ({
  test: /\.(scss|css)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: sourceMaps,
          minimize: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: sourceMaps,
          config: {
            path: path.join(__dirname, 'postcss.config.js')
          }
        }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: sourceMaps }
      }
    ]
  })
});


module.exports = {
  entry: './src',
  output: {
    filename: 'dist/demoComponent.min.js',
    libraryTarget: 'umd',
    library: 'demoComponent'
  },
  module: {
    loaders: [
      babelLoader,
      svgLoader,
      fontLoader,
      styleLoader(true)
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
};