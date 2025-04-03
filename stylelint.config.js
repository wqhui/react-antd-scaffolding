/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-less'], // ✅ 确保支持 Less 语法
  rules: {
    // ✅ 禁用 color-function-notation 警告（rgba 写法不再报错）
    'color-function-notation': null,
    'color-hex-length': null,
    'selector-class-pattern': [
      '^[a-z0-9]+([_-][a-z0-9]+)*$',
      {
        message:
          '类名必须使用小写字母、数字、下划线或连字符（如 .button_primary 或 .16-px-mar）',
      },
    ],
    'font-family-name-quotes': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
  overrides: [
    {
      // ✅ 解析 Less 语法，避免 @variables 报错
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'declaration-property-value-no-unknown': null, // ✅ 解决 unit(@x, px) 报错
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global'], // ✅ 忽略 :global
          },
        ],
      },
    },
    {
      // ✅ 解析普通 CSS，避免和 Less 解析冲突
      files: ['**/*.css'],
      customSyntax: 'postcss',
    },
  ],
}
