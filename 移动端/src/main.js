// 实现请求——历史上的今天:
const xhr = new XMLHttpRequest();
xhr.open("get", "https://api.oick.cn/lishi/api.php", true);
xhr.send();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const res = JSON.parse(xhr.responseText)
            const dataList = res.result;
            callback(dataList);
        } else {
            console.log("请求失败")
        }
    }
}
const section = document.getElementsByTagName("section")[0];
const callback = (data) => {
    for (const item of data) {
        const div = document.createElement("div");
        div.setAttribute("class", "show");
        div.innerHTML = `<p>${item.date.slice(0, 4)}年</p>\n` +
            `<img src=\"../public/line.png\" alt=\"分割线\">\n` +
            `<div>${item.title}</div>`
        section.appendChild(div);
    }
}

// 实现折叠栏:
const toolIcon = document.getElementsByTagName("img")[1];
const folder = document.getElementById("hideFolder");
let flag = false; // 标志折叠栏是否打开
toolIcon.addEventListener("click", (e) => {
    if (flag) {// 折叠栏已打开:
        folder.setAttribute("id", "hideFolder");
    } else {
        folder.setAttribute("id", "showFolder");
    }
    flag = !flag;
})

// 实现回到顶部图标:
const backIcon = document.getElementsByTagName("img")[4];
backIcon.addEventListener("click", (e) => {
    // 回到顶部
})

