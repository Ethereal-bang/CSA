for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        // console.log(new Date, i);
    }, 1000);
}
// console.log(new Date, i);
// 5 -> 5,5,5,5

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        // console.log(new Date, i);
    }, 1000);
}
// console.log(new Date, i);
// 5 -> 0,1,2,3,4

for (var i = 0; i < 5; i++) {
    (function f (i) {
        setTimeout(function() {
            console.log(new Date, i);
        }, 1000);
    })(i)
}
console.log(new Date, i);
// 5 -> 0,1,2,3,4
