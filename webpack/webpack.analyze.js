import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import prodConfig from './webpack.prod.js';

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

export default analyzeConfig;