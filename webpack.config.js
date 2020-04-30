const path = require('path');

const pathPrefix = './src/components';

const webpackConfig = {
  mode: 'development',
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
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
};
module.exports = webpackConfig;
