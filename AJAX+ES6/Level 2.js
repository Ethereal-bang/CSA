function ajax({
    url,
    method = 'get',
    params = "",
    header,
    async = true,
    timeout = 60 * 1000,    // 超时时间
}, successFn) {
    const xhr = new XMLHttpRequest();
    // 初始化请求：
    xhr.open(method, url, async);
    // 发送请求：
    xhr.send();
    // 获取请求体
    let responseData;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                successFn(xhr.responseText);
            } else {
                throw responseData = xhr.status + xhr.statusText;
            }
        }
    }
}

// 调用：
const recommend = document.getElementById("recommend");
function callback(res) {
    res = JSON.parse(res);
    let list = res.result;
    for (let i = 0; i <= 2; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "box");
        div.innerHTML = `
            <div class="imgBox">
                <img src=${list[i].picUrl} alt="song list pic" height="150" width="150">
                <span class="textUnderImg">${list[i].name}</span>
            </div>
            <div class="textInImg">▶${list[i].playCount}</div>`
        recommend.appendChild(div);
    }
}
ajax({
    url: "http://cloud-music.pl-fe.cn/personalized",
    param: "limit=2",
}, callback);