# React + Ant Design 项目脚手架

## 项目概述

基于React 19 + Ant Design 5 + Webpack 5构建的现代化前端开发脚手架，提供完整的开发环境配置和优化方案。

## 技术栈

- React 19
- Ant Design 5
- Webpack 5
- TypeScript
- Less

## 快速开始

1. 安装依赖
```bash
yarn
```

2. 开发模式
```bash
yarn dev
```
默认预览链接: http://localhost:9999/

3. 生产构建
```bash
yarn build
```

## 项目结构

```
├── src/                  # 源代码目录
│   ├── app.tsx           # 主应用组件
│   ├── entry.tsx         # 应用入口
│   └── assets/           # 静态资源
├── static/               # 静态文件
│   └── index.html        # HTML模板
├── webpack/              # Webpack配置
│   ├── webpack.common.js # 公共配置
│   ├── webpack.dev.js    # 开发配置
│   ├── webpack.prod.js   # 生产配置
│   └── webpack.analyze.js# 分析配置
└── ...                   # 其他配置文件
```

## 特性

### Webpack配置

- 支持JSX/TSX和ES6+语法
- 开发/生产环境分离
- 代码拆分优化
- Webpack Dev Server
- 打包分析
- HTML模板自动注入
- Less/CSS处理
- 资源文件加载
- Ant Design按需加载

### 代码质量

- ESLint + Prettier
- Stylelint
- TypeScript类型检查

## 依赖版本

核心依赖版本请参考package.json文件。

