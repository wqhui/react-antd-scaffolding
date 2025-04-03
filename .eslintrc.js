import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    ignores: ['node_modules', 'dist', 'public']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    // 新增 React 版本配置
    settings: {
      react: {
        version: 'detect' // 自动检测 package.json 中的 React 版本
      }
    }
  },
  {
    plugins: {
      'react-hooks': reactHooksPlugin // 注册 React Hooks 插件
    },
    rules: {
      // TypeScript 未使用变量设为警告[1,5](@ref)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_', // 忽略以 _ 开头的变量
          argsIgnorePattern: '^_' // 忽略以 _ 开头的参数
        }
      ],
      // React Hooks 规则配置[7,8](@ref)
      'react-hooks/rules-of-hooks': 'error', // 强制 Hook 调用顺序
      'react-hooks/exhaustive-deps': 'warn', // 依赖项检查设为警告
      '@typescript-eslint/no-explicit-any': 'warn', // 不允许使用 any 类型，显示警告
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended
]
