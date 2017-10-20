'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const templateContent = `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="pkg_root"></div>
    </body>
  </html>`;

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent,
  inject: 'body'
});

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};


const svgLoader = {
  test: /\.svg$/,
  exclude: /node_modules/,
  loader: 'svg-react-loader'
};


const fileLoader = {
  test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
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
          minimize: true,
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: sourceMaps,
          plugins: (loader) => [
              require('autoprefixer')
            ]
        }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: sourceMaps }
      }
    ]
  })
});


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/packageComponent.min.js',
    libraryTarget: 'umd',
    library: 'packageComponent'
  },
  module: {
    loaders: [
      babelLoader,
      svgLoader,
      fileLoader,
      styleLoader(true)
    ]
  },
  plugins: [
    htmlPlugin,
//    new ExtractTextPlugin('bundle.css'),
    new ExtractTextPlugin('lib/styles/packageName.scss'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
