import webpack from 'webpack'
import { dllManifestPath, dllPath } from '../paths.js'
import { LIB_FILE_PREFIX } from './utils.js'
const LIB_NAME = 'dll_[name]'
const FILE_NAME = `${LIB_FILE_PREFIX}[name].[hash].js`

export default {
  mode: 'development',
  entry: {
    //将 react、lodash等模块作为入口编译成动态链接库，可以理解为单独打包
    lib: ['react', 'react-dom'],
  },
  output: {
    //指定路径
    path: dllPath,
    //指定文件名
    //这个名称需要与 DllPlugin 插件中的 name 属性值对应起来
    library: LIB_NAME,
    filename: FILE_NAME,
    clean: true, //清理上次打包文件
  },
  plugins: [
    new webpack.DllPlugin({
      //和output.library中一致，值就是输出的manifest.json中的 name值
      name: LIB_NAME,
      path: dllManifestPath,
    }),
  ],
}
