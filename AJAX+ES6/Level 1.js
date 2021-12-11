const recommend = document.getElementById("recommend");
let xhr = new XMLHttpRequest(), list = [], num = 2;
xhr.open("get", `http://cloud-music.pl-fe.cn/personalized?limit=${num}`, true);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const res = JSON.parse(xhr.responseText);
            list = res.result;
            for (let i = 0; i <= num - 1; i++) {
                let div = document.createElement("div");
                div.setAttribute("class", "box");
                div.innerHTML = `
                        <div class="imgBox">
                            <img src=${list[i]?.picUrl} alt="song list pic" height="150" width="150">
                            <span class="textUnderImg">${list[i]?.name}</span>
                        </div>
                        <div class="textInImg">▶${list[i]?.playCount}</div>`
                recommend.appendChild(div);
            }
        } else {
            console.log("请求失败")
        }
    }
}
xhr.send();
