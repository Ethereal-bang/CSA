const ajax = (options) => {
    return new Promise((resolve, reject) => {
        let url = options.url + '?';
        for (const key in options.data) {
            url = `${url}${key}=${options.data[key]}&`;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            let flag = false;   // 标志是否请求成功
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    resolve(xhr.responseText);
                    flag = true;
                }
                if (!flag) {
                    reject(xhr.status + xhr.statusText);
                }
            }
        }
    })
}
ajax({
    url: 'http://cloud-music.pl-fe.cn/personalized',
    data: {limit: 2}
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err);
})