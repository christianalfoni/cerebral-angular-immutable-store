var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: 'cerebral-angular-immutable-store.js',
    libraryTarget: 'umd',
    library: 'Cerebral'
  },
  externals: {
    "angular": "angular"
  }
};

module.exports = config;
