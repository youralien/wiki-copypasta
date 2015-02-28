// Webpack configuration to use with the build task.

var webpack = require('webpack');
var path    = require('path');

module.exports = {

  // Create also a "lib" chunk with common libraries, e.g. react.
  entry: {
    lib: ['react', 'react-router', 'showdown'],
    main: './client.jsx'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join('public', 'js'),
    publicPath: '/js/'
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production") // This has effect on the react lib size
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx$/, loaders: ['jsx']
    }]
  },

  externals: {
    fs: 'null'
  }
};
