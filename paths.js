/*
 * @Author: wqhui
 * @Date: 2021-05-28 15:04:18
 * @Description:  路径调用的配置文件
 */
const path = require("path");

const rootPath = path.resolve(__dirname)
const outputPath = path.resolve(rootPath, 'build')
const nodeModulesPath = path.resolve(rootPath,'node_modules')
const staticPath = path.resolve(rootPath, 'static')
const srcPath = path.resolve(rootPath, 'src')
const entryPath = path.resolve(srcPath, 'entry.tsx')
const publicHtmlPath = path.resolve(staticPath, 'index.html')

module.exports = {
    rootPath,
    outputPath,
    srcPath,
    entryPath,
    staticPath,
    publicHtmlPath,
    nodeModulesPath
}