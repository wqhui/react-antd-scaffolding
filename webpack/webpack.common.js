const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = require('../paths')

const IS_DEV = process.env.NODE_ENV === 'development'
const CSS_NAME = IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css'
const JS_NAME = IS_DEV ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
const LESS_NAME = 'hui-[name]-[local]'

const IMGAE_INLINE_LINT_SIZE = 8 * 1024

const commonConfig = {
    entry: {
        app: PATHS.entryPath
    },
    output: {
        path: PATHS.outputPath,
        filename: JS_NAME,
        clean: true, //清理上次打包文件
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': PATHS.srcPath // @是src目录别名
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['thread-loader','babel-loader'],
                include: [
                    PATHS.srcPath,
                ],
                exclude: PATHS.nodeModulesPath
            },
            {
                test: /(\.css|\.less)$/,
                exclude: PATHS.nodeModulesPath,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader //以link的方式插入html
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            modules: {
                                localIdentName: LESS_NAME
                            }
                        }
                    },
                    'postcss-loader',//css自动兼容，配置见postcss.config.js
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                // ant design配置
                test: /\.less$/,
                include: PATHS.nodeModulesPath,
                use: [
                    'style-loader','css-loader','postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                                modifyVars: {},
                                javascriptEnabled: true,
                            },
                        }
                    }
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: IMGAE_INLINE_LINT_SIZE // 小于8k的内联url(data:) 大于4k的直接路径引用
                    }
                },
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            },
        ]
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                //提取所有的 CSS 到一个文件中
                // styles: {
                //     name: 'app',
                //     type: 'css/mini-extract',
                //     // For webpack@4
                //     // test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true,
                // },
                //分割src代码
                common: {
                    name: 'chunk-common',
                    test: /[\\/]src[\\/]/,
                    //可选值有 async、 initial 和 all。
                    //默认值是 async，也就是默认只选取异步加载的chunk进行代码拆分。
                    //initial 也就是默认同步加载的代码
                    //all 上述两种情况都涵盖
                    chunks: 'all',
                    // 拆分前必须共享模块的最小 chunks 数,也就当前的文件被1个以上的文件引用时才拆分
                    minChunks: 1,
                    //生成 chunk 的最小体积（以 bytes 为单位）
                    minSize: 0, 
                    //一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组
                    priority: 1,
                },
                //分割node包代码
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 2,
                },
                antd: {
                    name: 'chunk-antd',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    chunks: 'all',
                    priority: 3,
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.publicHtmlPath
        }),
        new MiniCssExtractPlugin({
            filename: CSS_NAME,
        }),
        //定义到模块中使用的process.env，默认的就是mode参数的值
        new webpack.DefinePlugin({
            'process.env': {}
        })
    ]
}

module.exports = commonConfig