
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

console.log('-------------------');
console.log(process.env.NODE_ENV);
console.log('-------------------');

module.exports = {
  entry: {app: path.resolve(__dirname, 'public', 'app.js')},
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
          'postcss-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
};