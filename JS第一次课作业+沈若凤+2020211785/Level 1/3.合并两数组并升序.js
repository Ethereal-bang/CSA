var arr1=[1,3,5,7,9];
var arr2=[2,4,6,8,10];

function merge(arr1,arr2){
    // 双指针
    let i = j = 0, arr = [], count = 0;
    while (!(i === arr1.length && j === arr2.length)) {  // 将两数组元素都排完 {
        // console.log(i ,j)
        if (arr1[i] < arr2[j] || arr2.length === j) {
            arr.push(arr1[i++]);
        } else {
            arr.push(arr2[j++]);
        }
        // console.log("arr:", arr)
    }

    return arr;
}

console.log(merge(arr1,arr2));//[1,2,3,4,5,6,7,8,9,10]