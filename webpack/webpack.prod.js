const webpack = require('webpack')
const {merge} = require('webpack-merge')

const PATHS = require('../paths')
const commonConfig = require('./webpack.common')

const prodConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',

})

module.exports = prodConfig