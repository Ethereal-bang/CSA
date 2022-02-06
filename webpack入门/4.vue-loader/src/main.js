import App from './App.vue' // 根vue文件
import Vue from 'vue' // 引入vue.js对象

new Vue({
    render: h => h(App) // 渲染函数, 渲染App组件里的标签
}).$mount('#app') // 把vue文件的标签结构 -> 挂载到id为app的标签里