// eslint.config.js

// 引入一些全局变量（如 window, document 等）
// 这些在浏览器环境下是默认存在的
import globals from 'globals'
// typescript-eslint 提供了一整套适用于 TypeScript 的推荐规则和 parser
import tseslint from 'typescript-eslint'
// React 插件，用于提供 React 相关的 lint 规则
import reactPlugin from 'eslint-plugin-react'
// React Hooks 插件，用于检查 Hook 的使用合法性
import reactHooksPlugin from 'eslint-plugin-react-hooks'
// prettier 插件推荐配置，统一代码格式
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  // 设置匹配的文件范围，并定义语言环境（全局变量等）
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // 支持的所有文件类型
    languageOptions: {
      globals: {
        ...globals.browser, // 注入浏览器常见全局变量（window, document 等）
      },
    },
  },

  // 排除不需要 lint 的目录
  {
    ignores: ['node_modules', 'dist', 'public'],
  },

  // TypeScript 推荐配置（包括 parser + 规则）
  // 提供类型检查相关的最佳实践规则
  ...tseslint.configs.recommended,

  // React 推荐配置（包含基础规则）
  reactPlugin.configs.flat.recommended,

  // 针对 JSX Runtime 的支持（支持新版自动引入 jsx 运行时）
  reactPlugin.configs.flat['jsx-runtime'],

  // 设置 React 插件的配置（如自动识别 react 版本）
  {
    settings: {
      react: {
        version: 'detect', // 自动从 package.json 中读取 React 版本
      },
    },
  },

  // 自定义插件和规则配置
  {
    plugins: {
      'react-hooks': reactHooksPlugin, // 注册 React Hooks 插件
    },
    rules: {
      // 忽略以 _ 开头的变量或参数，防止误报未使用
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_', // 忽略变量
          argsIgnorePattern: '^_', // 忽略参数
        },
      ],

      // 强制正确使用 React Hooks（useXxx 写在顶层）
      'react-hooks/rules-of-hooks': 'error',

      // Hooks 的依赖项自动检查
      'react-hooks/exhaustive-deps': 'warn',

      // 不建议使用 any 类型，但只报 warning
      '@typescript-eslint/no-explicit-any': 'warn',

      // 禁用未使用表达式的检查，避免误报（如短路语句）
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  /**
   * prettier 推荐配置，确保代码风格统一
   * 该配置自动合并根目录下的 prettier.config.js 或 .prettierrc 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
]
