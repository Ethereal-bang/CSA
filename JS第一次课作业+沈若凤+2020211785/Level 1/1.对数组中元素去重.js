var arr=[1,2,3,3,4,'a','a','b','c'];

function reduce(arr){
    var res=[];
    //code
    res = Array.from(new Set(arr));
    return res;
}

console.log(reduce(arr));  //[1, 2, 3, 4, "a", "b", "c"]