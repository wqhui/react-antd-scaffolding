import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import prodConfig from './webpack.prod.js'
import devConfig from './webpack.dev.js'

// 根据 NODE_ENV 选择基础配置
const baseConfig =
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig

// 确保 baseConfig.module 和 baseConfig.plugins 有默认值
const baseModule = (baseConfig && baseConfig.module) || {}
const baseRules = Array.isArray(baseModule.rules) ? baseModule.rules : []
const basePlugins = Array.isArray(baseConfig.plugins) ? baseConfig.plugins : []

const isLessRule = (rule) => {
  try {
    if (typeof rule === 'object') {
      return (
        rule?.test && rule.test instanceof RegExp && rule.test.test('.less')
      )
    }
    return false
  } catch (e) {
    return false
  }
}

// 拆分处理 .less 文件的规则
const lessRules = baseRules.filter((rule) => isLessRule(rule))

// 构造一个没有 .less 规则的 rules 数组供测量时使用
const rulesWithoutLess = baseRules.filter((rule) => !isLessRule(rule))

// 拆分出 mini-css-extract-plugin 的插件实例，避免 SMP 包装时冲突
const miniCssPlugins = basePlugins.filter((plugin) => {
  try {
    return (
      plugin &&
      plugin.constructor &&
      plugin.constructor.name === 'MiniCssExtractPlugin'
    )
  } catch (e) {
    return false
  }
})

// 剩下的插件，非 mini-css-extract-plugin
const remainingPlugins = basePlugins.filter((plugin) => {
  try {
    return !(
      plugin &&
      plugin.constructor &&
      plugin.constructor.name === 'MiniCssExtractPlugin'
    )
  } catch (e) {
    return true
  }
})

// 构造测量用配置：用不含 .less loader 的 rules 和剩下的插件
const configForMeasure = {
  ...baseConfig,
  module: {
    ...baseModule,
    rules: rulesWithoutLess,
  },
  plugins: remainingPlugins,
}

const smp = new SpeedMeasurePlugin({
  granularLoaderData: true, // 显示每个模块的 loader 耗时
  disable: false, // 启用 SMP
  outputFormat: 'human', // 输出格式，可选 'human' | 'json' | 'humanVerbose'
  outputTarget: console.log, // 自定义输出目标
})

// 使用 SMP 包装配置
// @ts-expect-error 由于 SpeedMeasurePlugin 的类型定义可能存在问题，这里使用 @ts-expect-error 来忽略类型检查
const measuredConfig = smp.wrap(configForMeasure)

// 确保 measuredConfig.module 和 measuredConfig.plugins 存在默认值
const measuredModule = measuredConfig && measuredConfig.module
const measuredRules = Array.isArray(measuredModule?.rules)
  ? measuredModule.rules
  : []
const measuredPlugins = Array.isArray(measuredConfig.plugins)
  ? measuredConfig.plugins
  : []

// 合并回来：将原本处理 .less 文件的 rule 和 mini-css-extract-plugin 插件加入到最终配置中
const finalConfig = {
  ...measuredConfig,
  module: {
    ...measuredModule,
    rules: [...measuredRules, ...lessRules],
  },
  plugins: [...measuredPlugins, ...miniCssPlugins],
}

export default finalConfig
