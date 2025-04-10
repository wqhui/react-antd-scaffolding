import webpack from 'webpack'
import { merge } from 'webpack-merge'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

import * as PATHS from '../paths.js'
import commonConfig from './webpack.common.js'
import { getDLLFiles, logEnableDllReferenceInfo } from './utils.js'

const __filename = fileURLToPath(import.meta.url)

const relativeDllPath = path.relative(PATHS.rootPath, PATHS.dllPath) //相对于 rootPath 的路径
// 获取 DLL 目录下所有 JS 文件
const dllFiles = getDLLFiles()
let dllPlugins = []
if (dllFiles.length) {
  logEnableDllReferenceInfo()
  dllPlugins = [
    new webpack.DllReferencePlugin({
      manifest: PATHS.dllManifestPath,
    }),
    new AddAssetHtmlPlugin(
      dllFiles.map((file) => {
        return {
          filepath: file,
          outputPath: relativeDllPath,
          publicPath: relativeDllPath,
        }
      }),
    ),
  ]
}

/** @type {import('webpack').Configuration} */
const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    clean: false, // 清理文件，热更新时也会清理dll引用，导致热更新再刷新浏览器异常...
  },
  devServer: {
    port: '9999',
    static: {
      directory: PATHS.outputPath,
    },
    hot: true,
  },
  cache: {
    type: 'filesystem', // 将缓存存储在文件系统中，区别于默认的内存缓存
    cacheDirectory: PATHS.webpackCacheDirectory, // 可选：设置缓存文件存放的路径，默认为 node_modules/.cache/webpack
    buildDependencies: {
      config: [__filename], // 指定额外依赖；例如：当 webpack 配置文件本身发生变化时缓存将自动失效
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // react热更新插件
    ...dllPlugins,
  ],
})

export default devConfig
