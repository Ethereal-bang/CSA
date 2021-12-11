class Ajax {
    constructor(options = {}) {
        this.options = options;
    }

    get = (url, options = {}) => {
        const headers = options.headers || this.options.headers || {};
        const successCallback = options.success || this.options.afterSuccess;
        const failCallback = options.error || this.options.afterError
        // 合并参数:
        const data = Object.assign({}, this.options.data, options.data);
        // 设置url（加上参数
        url = url + '?';
        for (const key in data) {
            url = `${url}${key}=${data[key]}&`;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        // 设置请求头：
        if (Object.keys(headers).length !== 0)
            xhr.setRequestHeader(Object.keys(headers).toString(), Object.values(headers).toString()); //?
        xhr.send();
        xhr.onreadystatechange = () => {
            let flag = false;   // 标志是否请求成功
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    successCallback(xhr.responseText);
                    flag = true;
                }
                if (!flag) {
                    failCallback(xhr.status + xhr.statusText);
                }
            }
        }
    }
    post = (url, options) => {
        const headers = options.headers || this.options.headers || {};
        const successCallback = options.success || this.options.afterSuccess;
        const failCallback = options.error || this.options.afterError
        // 合并参数:
        const data = Object.assign({}, this.options.data, options.data);

        const xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        // 设置请求头：
        if (Object.keys(headers).length !== 0)
            xhr.setRequestHeader(Object.keys(headers).toString(), Object.values(headers).toString()); //?
        xhr.send(data);
        xhr.onreadystatechange = () => {
            let flag = false;   // 标志是否请求成功
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    successCallback(xhr.responseText);
                    flag = true;
                }
                if (!flag) {
                    failCallback(xhr.status + xhr.statusText);
                }
            }
        }
    }
}

const ajax = new Ajax();
ajax.get("http://cloud-music.pl-fe.cn/personalized", {
    success: (data) => {
        console.log(data)
    },
    data: {limit: 2}
});