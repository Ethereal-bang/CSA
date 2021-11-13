var arr=[1,5,4,8,2,6,3,9,7];
// 冒泡升序
function mySort(arr){
    //code
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {  // 不符合升序则两两交换
                [arr[j], arr[ j+ 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

console.log(mySort(arr)); //[1,2,3,4,5,6,7,8,9]