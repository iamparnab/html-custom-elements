const path = require('path');

const webpackConfig = {
  mode: process.env.MODE,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 9635,
    compress: true,
    writeToDisk: true,
    contentBase: './',
  },
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
};
module.exports = webpackConfig;
