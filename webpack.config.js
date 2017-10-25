'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const publicPath = path.resolve(__dirname, 'server', 'src', 'static');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const appPath = path.resolve(__dirname, 'client', 'src', 'App.js');

const isProd = process.env.NODE_ENV === 'production' ? true : false;

console.log('Client: process.env.NODE_ENV: ' + process.env.NODE_ENV);

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: publicPath
});
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  devtool: (isProd ? 'source-map' : 'eval'),
  entry: {
    bootstrap: bootstrapConfig,
    app: appPath,
  },
  output: {
    path: publicPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [nodeModulesPath],
        use: {
          loader: 'babel-loader',
          query: JSON.stringify({
            presets: ['env', 'react', 'stage-2'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
          }),
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        use: cssConfig,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=' + (isProd ? '/' : '') + 'images/[name].[ext]',
          // 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]&outputPath=images/&publicPath=images/',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000&name=' + (isProd ? '/' : '') + 'fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader?name=' + (isProd ? '/' : '') + 'fonts/[name].[ext]'
      },
      {
        // Bootstrap 3
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
    ]
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
    host: 'localhost',
    port: 3000,
    stats: 'errors-only',
    hot: true,
    clientLogLevel: 'none',
    watchContentBase: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Max-Age': '1000',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token',
    },
    proxy: {
      '*': {
        target: 'http://localhost:3030',
        'changeOrigin': true,
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ // Iterate this plugind and excludeChunks for new page templates.
      title: 'Welcome to the website analyser.', // Load a custom template (ejs by default).
      minify: {
        collapseWhitespace: false,
      },
      hash: false,
      filename: 'for_index_template.html',
      favicon: path.resolve(__dirname, 'client', 'src', 'images', 'favicon.ico'),
      template: path.resolve(__dirname, 'server', 'src', 'template', 'index.ejs')
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),

    new CleanWebpackPlugin(publicPath + '/*'),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
}