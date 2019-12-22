const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const staticMiddleWare = express.static('dist');

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);
app.use(webpackHotMiddleware);
app.use(staticMiddleWare);

app.listen(3000);

app.get('/test', function(req, res) {
  res.send('hello world');
});

console.log('------------------------');
console.log('reload expresss');
console.log('------------------------');
