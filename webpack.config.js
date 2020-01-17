const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

// webpeack config
const isDev = process.env.NODE_ENV === 'development' ? true : false;
const configCustom = isDev
  ? require('./webpack.dev')
  : require('./webpack.prod');
const config = {
  entry: {
    index: ['babel-polyfill', path.resolve(__dirname, 'src', 'index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve('./node_modules'), path.resolve('./src/js')],
    alias: {
      '@': path.resolve(__dirname, 'src', 'js'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CopyWebpackPlugin([
      {
        context: 'src/',
        from: 'images/',
        to: 'images/',
        force: true,
      },
    ]),
    new webpack.ProvidePlugin({
      TweenMax: ['gsap', 'TweenMax'],
      IG: 'modules/global',
    }),
  ],
};

console.log('-----------------------');
console.log('Developer Mode = ' + process.env.NODE_ENV);
console.log('-----------------------');

module.exports = merge(config, configCustom);
