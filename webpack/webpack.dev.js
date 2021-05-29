const webpack = require('webpack')
const {merge} = require('webpack-merge')

const PATHS = require('../paths')
const commonConfig = require('./webpack.common')

const devConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {// webpack-dev-server
        port: '9999',
        contentBase: PATHS.outputPath,
        hot: true
    },
})

module.exports = devConfig