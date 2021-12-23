/*
* 保留字母、单引号 / 去除——特殊符号、问号
* 替换为大写——特殊符号后 问号后 是字母 的
* */
const str = "I'm?���going�??�to�?�take�??�a?�trip�?�to��?daocheng�?�on��May Day."

// 特殊符号：/([^\w'?])/
const matchIndex = str.match(/([^\w'?])\?(?=\w)/)["index"]  // 匹配特殊字符+问号+字母
const res = str.replace(str[matchIndex + 2], (char) => {
    return char.toUpperCase();
})  // 对应位置变为大写
    .replace(/([^\w'])/g, ' ')  // 字母和单引号外全部转化为空格
    .replace(/ +/g, ' ');    // 多个空格的替换为单个空格

console.log(str)
console.log(res)
