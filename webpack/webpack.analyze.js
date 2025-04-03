const {merge} = require('webpack-merge')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const prodConfig = require('./webpack.prod')

/** @type {import('webpack').Configuration} */
const analyzeConfig = merge(prodConfig, {
    plugins:[ 
        // 配置打包分析 
        new BundleAnalyzerPlugin({
          // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
          // generateStatsFile: true, // 是否生成stats.json文件
        })
    ]
})

module.exports = analyzeConfig