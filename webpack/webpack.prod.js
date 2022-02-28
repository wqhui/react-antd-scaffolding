const webpack = require('webpack')
const {merge} = require('webpack-merge')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = require('../paths')
const commonConfig = require('./webpack.common')

const prodConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map', //生成.js.map的映射文件   
    optimization: {
        minimizer: [
            //压缩css
            new CssMinimizerPlugin(
                {
                    exclude: PATHS.nodeModulesPath
                }
            ),
            //压缩js 也可以使用...扩展现有的
            new TerserPlugin({}),
        ],
    },
})

module.exports = prodConfig