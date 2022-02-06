const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            // 告诉webpack使用插件时以我们自己的html文件作为模板生成dist/html文件
        })
    ],
    module: {
        rules: [    // loader的规则
            {
                test: /\.css$/, // 匹配.css文件
                use: [ "style-loader", "css-loader" ]
                // use数组从右向左运行，先css-loader让webpack识别并打包，style-loader再将央视插入到dom
            }, {
                test: /\.s[ac]ss$/i,    // 匹配sass/scss文件(忽略大小写
                use: [ "style-loader", "css-loader", "sass-loader" ]
            }, {
                test: /\.(png|jpg|gif|jpeg)$/i,
                type: 'asset'
            }, {
                
            }
        ]
    },
    mode: "development",
}