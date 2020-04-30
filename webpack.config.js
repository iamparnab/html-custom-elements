const path = require('path');
const chalk = require('chalk');

const pathPrefix = './src/components';

console.log(
  chalk.cyan('MODE') +
    ' ' +
    chalk.red('is') +
    ' ' +
    chalk.yellowBright(process.env.MODE)
);

const webpackConfig = {
  mode: process.env.MODE,
  entry: {
    popup: pathPrefix + '/Popup/index.js',
    timestamp: pathPrefix + '/Timestamp/index.js',
    imginput: pathPrefix + '/ImgInput/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    port: 9635,
    compress: true,
    writeToDisk: true,
    contentBase: './',
    historyApiFallback: {
      rewrites: [
        {
          from: '/popup',
          to: pathPrefix + '/Popup/index.html',
        },
        {
          from: '/timestamp',
          to: pathPrefix + '/Timestamp/index.html',
        },
        {
          from: '/img-input',
          to: pathPrefix + '/ImgInput/index.html',
        },
      ],
    },
  },
  devtool: process.env.MODE === 'development' ? 'eval-source-map' : 'none',
  watchOptions: {
    ignored: /node_modules/,
  },
};
module.exports = webpackConfig;
