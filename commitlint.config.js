// commitlint.config.js
/**
 * Commitlint 配置文件，用于定义提交信息的规范。
 * 该配置文件继承自 '@commitlint/config-conventional' 并自定义了一些规则。
 */
export default {
  /**
   * 继承的配置，这里使用了 '@commitlint/config-conventional' 作为基础配置。
   */
  extends: ['@commitlint/config-conventional'],
  /**
   * 自定义的规则。
   */
  rules: {
    // type 类型定义
    /**
     * 'type-enum' 规则定义了提交类型的枚举值。
     * 第一个参数 2 表示该规则是错误级别，即违反规则会报错。
     * 第二个参数 'always' 表示该规则总是应用。
     * 第三个参数是一个数组，包含了所有允许的提交类型。
     */
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bugfix
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
        'other', // 其他
      ],
    ],
    /**
     * 'type-case' 规则定义了提交类型的大小写。
     * 第一个参数 2 表示该规则是错误级别。
     * 第二个参数 'always' 表示该规则总是应用。
     * 第三个参数 'lowerCase' 表示提交类型必须是小写。
     */
    'type-case': [2, 'always', 'lowerCase'],
    /**
     * 'type-empty' 规则定义了提交类型是否可以为空。
     * 第一个参数 2 表示该规则是错误级别。
     * 第二个参数 'never' 表示提交类型不可以为空。
     */
    'type-empty': [2, 'never'],
    /**
     * 'scope-empty' 规则定义了提交范围是否可以为空。
     * 第一个参数 0 表示该规则是禁用级别。
     * 第二个参数 'never' 表示提交范围不可以为空。
     */
    'scope-empty': [0, 'never'],
    /**
     * 'scope-case' 规则定义了提交范围的大小写。
     * 第一个参数 2 表示该规则是错误级别。
     * 第二个参数 'always' 表示该规则总是应用。
     * 第三个参数是一个数组，包含了所有允许的大小写格式。
     */
    'scope-case': [
      2,
      'always',
      [
        'lower-case', // default
        'upper-case', // UPPERCASE
        'camel-case', // camelCase
        'kebab-case', // kebab-case
        'pascal-case', // PascalCase
        'sentence-case', // Sentence case
        'snake-case', // snake_case
        'start-case', // Start Case
      ],
    ],
    // "scope-enum": [2, "always", []],
    // subject 大小写不做校验
    /**
     * 'subject-case' 规则定义了提交主题的大小写。
     * 第一个参数 0 表示该规则是禁用级别。
     */
    'subject-case': [0],
    /**
     * 'subject-empty' 规则定义了提交主题是否可以为空。
     * 第一个参数 2 表示该规则是错误级别。
     * 第二个参数 'never' 表示提交主题不可以为空。
     */
    'subject-empty': [2, 'never'],
  },
}
