/*
 * @Author: wqhui
 * @Date: 2021-05-28 15:04:18
 * @Description:  路径调用的配置文件
 */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootPath = path.resolve(__dirname)
const outputPath = path.resolve(rootPath, 'build')
const nodeModulesPath = path.resolve(rootPath, 'node_modules')
const staticPath = path.resolve(rootPath, 'static')
const srcPath = path.resolve(rootPath, 'src')
const entryPath = path.resolve(srcPath, 'entry.tsx')
const publicHtmlPath = path.resolve(staticPath, 'index.html')
const faviconPath = path.resolve(srcPath, 'assets/images/favicon-48.png')
const dllPath = path.resolve(rootPath, 'dll')
const dllManifestPath = path.resolve(dllPath, 'manifest.json')
const webpackCacheDirectory = path.resolve(rootPath, '.webpack_cache')

export {
  rootPath,
  outputPath,
  srcPath,
  entryPath,
  staticPath,
  publicHtmlPath,
  nodeModulesPath,
  faviconPath,
  dllPath,
  dllManifestPath,
  webpackCacheDirectory,
}
