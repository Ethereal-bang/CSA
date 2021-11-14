var data = {
    age: 18,
    name: "这是真的难",
    education: ["小学", "初中", "高中", "大学", undefined, null],
    friends: [
        { name: "Amber",sex: "woman"},
        { name: "Barbara",sex: "woman"},
        { name: "Venti",sex: "man"}],
    work: {
        time: "2021",
        project: { name: "test",obtain: ["css", "html", "js"]}
    },
    play: function() {    console.log("玩滑板");  }
}
// 一：object.create()
let data2 = Object.create(data, {});
// 二：扩展运算符
let data3 = {...data};

/* 浅拷贝——指向同一地址：*/
// let data4 = data;
// data4.age = 20;  // data.age -> 20
/* 深拷贝——不同地址： */
data3.age = 19;
console.log(data.age, data.name, data3.age, data3.name)