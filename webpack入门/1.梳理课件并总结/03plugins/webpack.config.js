const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            // 告诉webpack使用插件时以我们自己的html文件作为模板生成dist/html文件
        })
    ]
}