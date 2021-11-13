var arr=[{name:'xiaoming',age:18},{name:'zhangsan',age:34},
    {name:'lisi',age:29},{name:'wangwu',age:24}];

function sortby(key , way = true){//way为true表示默认按照升序排列
    return function (firstEl, secondEl) {   // 返回接受两元素的函数
        if (typeof firstEl[key] === "string") {
            if (firstEl[key] < secondEl[key]) {
                return way ? -1 : 1;
            } else {
                return way ? 1 : -1;
            }
        }
        return firstEl[key] - secondEl[key];
    }
}

console.log(arr.sort(sortby('age')))
//[{name: "xiaoming", age: 18},{name: "wangwu", age: 24},{name: "lisi", age: 29},{name: "zhangsan", age: 34}]
console.log(arr.sort(sortby('name',false)))
//[{name: "zhangsan", age: 34},{name: "xiaoming", age: 18},{name: "wangwu", age: 24},{name: "lisi", age: 29}]