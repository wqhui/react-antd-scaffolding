const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PATHS = require('../paths')

const IS_DEV = process.env.NODE_ENV === 'development'
const CSS_NAME = IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css'
const JS_NAME = IS_DEV ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
const LESS_NAME ='hui-[name]-[local]'

const IMGAE_INLINE_LINT_SIZE = 8 * 1024

const commonConfig = {
    entry: {
        app: PATHS.entryPath
    },
    output: {
        path: PATHS.outputPath,
        filename: JS_NAME,
        clean: true, //清理上次打包文件
        assetModuleFilename: 'images/[hash][ext][query]' //自定义输出文件名
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
                use: ['babel-loader'],
                include: [
                    PATHS.srcPath,
                ],
                exclude: PATHS.nodeModulesPath
            },
            {
                test: /(\.css|\.less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
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
                    'postcss-loader',
                    {
                        loader: 'less-loader'
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
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource'
            },
        ]
    },
    optimization: {
        minimizer: [//开发模式下使用，请设置 optimization.minimize 选项为 true。
          new CssMinimizerPlugin(),
        ],
        splitChunks: {//提取所有的 CSS 到一个文件中
            cacheGroups: {
              styles: {
                name: 'app',
                type: 'css/mini-extract',
                // For webpack@4
                // test: /\.css$/,
                chunks: 'all',
                enforce: true,
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
    ]
}

module.exports = commonConfig