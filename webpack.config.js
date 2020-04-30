const path = require('path');

const webpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    port: 9635,
    compress: true,
    writeToDisk: true,
    contentBase: './',
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
};
module.exports = webpackConfig;
