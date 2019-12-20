
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development' ? true : false;
const webpackObj = isDev ? require('./webpack.dev') : require('./webpack.prod');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {app: path.resolve(__dirname, 'src', 'app.js')},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            }
          }
        ]
      }, {
        test: /\.(png|jpe|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CopyWebpackPlugin([
      { 
        context: 'src/',
        from: 'images/',
        to: 'images/',
        force: true
      }
    ])
  ]
};

console.log('-----------------------');
console.log(isDev);
console.log('-----------------------');

module.exports = merge(config, webpackObj);