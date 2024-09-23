const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

const devConfig = {
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
