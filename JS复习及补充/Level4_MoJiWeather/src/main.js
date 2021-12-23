const hotCities = document.getElementsByClassName("cities_list")[2];
new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "https://geoapi.qweather.com/v2/city/top?key=5f9a83a6843c4083865a6b1a41ce43f3&range=cn&number=7");
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                const res = JSON.parse(xhr.responseText)
                resolve(res);
            } else {
                reject("请求失败");
            }
        }
    }
}).then((data) => {
    const ul = document.getElementById('hot_cities');
    data.topCityList?.map(list => {
        const ele = document.createElement("li");
        ele.innerHTML = `<a>${list.name}</a>`;
        ul.appendChild(ele);
    })
})