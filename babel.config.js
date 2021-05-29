/*
 * @Author: wqhui
 * @Date: 2021-05-28 15:52:08
 * @Description:  bebel配置
 */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "chrome": "50",
                    "ie": "11"
                }
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        ['import', {
            libraryName: 'antd',
            libraryDirectory: 'lib',
            style: true
        }]
    ]
}