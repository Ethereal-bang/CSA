const path = require("path");

module.exports = {
    entry: "./src/main.js", // 入口
    output: {
        path: path.join(__dirname, "dist"), // 出口路径
        filename: "bundle.js",  // 出口文件名
        clean: true,    // 每次构建前清理/dist
    },
    mode: "development",
}