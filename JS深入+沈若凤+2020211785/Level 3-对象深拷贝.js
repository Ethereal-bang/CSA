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
/**
* @param target 粘贴到
* @param source 复制
* */
function deepClone(target, source) {
    // 1. target即每个object类型存放地址
    if (source === null) {  // 不然null会复制为{}
        return source;
    } else if (!target) {
        target = {};
    }

    // 2. 遍历source
    for (const key in source) {
        // 2.1 source[key]为普通类型——直接存入target对象
        if (typeof source[key] !== "object") {
            target[key] = source[key];
        }

        // 2.2 source[key]为Array——递归
        else if (Array.isArray(source[key])) {
            target[key] = [];
            target[key] = deepClone(target[key], source[key])
        }

        // 2.3 source[key]为Object——递归
        else {
            target[key] = deepClone(target[key], source[key]);
        }
    }
    return target;
}

let data1 = deepClone(undefined, data);
data1.education.push("test");
console.log("data:", data)
console.log("data1:", data1)
