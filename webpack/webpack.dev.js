import { merge } from 'webpack-merge'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import * as PATHS from '../paths.js'
import commonConfig from './webpack.common.js'

/** @type {import('webpack').Configuration} */
const devConfig = merge(commonConfig, {
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
    new ReactRefreshWebpackPlugin(), // react热更新插件
  ],
})

export default devConfig
