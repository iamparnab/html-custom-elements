const glob = require('glob');
const path = require('path');
const chalk = require('chalk');

const pathPrefix = './src/components';
const pages = glob.sync(pathPrefix + '/**/index.js').reduce(
  (all, path) => {
    const entry = path
      .replace('/index.js', '')
      .toLowerCase()
      .split('/')
      .slice(-1)[0];

    return {
      entries: {
        ...all.entries,
        [entry]: path,
      },
      rewrites: [
        ...all.rewrites,
        {
          from: '/' + entry,
          to: path.replace('/index.js', '/index.html'),
        },
      ],
    };
  },
  { entries: {}, rewrites: [] }
);

console.log(pages);

console.log(
  chalk.cyan('MODE') +
    ' ' +
    chalk.red('is') +
    ' ' +
    chalk.yellowBright(process.env.MODE)
);

const webpackConfig = {
  mode: process.env.MODE,
  entry: pages.entries,
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
      rewrites: pages.rewrites,
    },
  },
  devtool: process.env.MODE === 'development' ? 'eval-source-map' : 'none',
  watchOptions: {
    ignored: /node_modules/,
  },
};
module.exports = webpackConfig;
