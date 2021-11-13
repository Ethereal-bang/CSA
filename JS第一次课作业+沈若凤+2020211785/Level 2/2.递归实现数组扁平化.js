var arr = [1, [2, 3], 4, [5, [6, [7, 8]]],[9, 10]];
res = []; //用来存储返回的数据

// console.log(typeof arr[0], typeof arr[1])  // number object

function fun1(arr) {
    for (let item of arr) {
        if (typeof item === "object") {
            fun1(item);
        } else {
            res.push(item);
        }
    }
}

fun1(arr);
console.log(res); //[1,2,3,4,5,6,7,8,9,10];