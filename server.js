// Server initialization
var path = require('path');

var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev.js');
var webpackMiddleware = require("webpack-dev-middleware");

var app = express();
var compiler = webpack(config);

// Webpack middleware
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve static files in 'public' directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Send any requests to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server listening at", process.env.IP || "0.0.0.0", ":", process.env.PORT || 8080);
  console.log("Code is live at https://bowling_game-tonnamb.c9users.io/");
});
