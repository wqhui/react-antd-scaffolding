const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PATHS = require('../paths')
const commonConfig = require('./webpack.common')

/** @type {import('webpack').Configuration} */
const devConfig = merge(commonConfig,{
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      port: '9999',
      static: {
        directory: PATHS.outputPath,
      },
      hot: true,
    },
    plugins: [
        new ReactRefreshWebpackPlugin() // react热更新插件
    ]
});



module.exports = devConfig