import ajax from "./ajax.js";

const form = {
    username: document.querySelector("div #username"),
    pwd: document.querySelector("div #password"),
    registerBtn: document.querySelector("div #register"),
    loginBtn: document.querySelector("div #login"),
};
const status = document.querySelector("h1");

form.registerBtn.addEventListener("click", () => {
    ajax({
        url: "/isUserExist",
        data: {
            "username": form.username.value,
        }
    })
        .then(res => {
            if (res === "true") {
                alert("该用户名已存在，请勿重复注册");
            } else {
                ajax({
                    url: "/register",
                    data: {
                        "username": form.username.value,
                        "pwd": form.pwd.value,
                    }
                })
                    .then(res => {
                        if (/Data too long/g.test(res)) {
                            alert("长度过长，请设置6位以内用户名和密码")
                        }
                        console.log(res)
                    })
            }
        })
})

form.loginBtn.addEventListener("click", () => {
    const username = form.username.value, pwd = form.pwd.value;
    if (username.length === 0 || username.length > 6 || pwd.length === 0 || pwd.length > 6 ) {
        alert("格式错误：请输入1~6位用户名和密码！");
        return;
    }
    ajax({
        url: "/login",
        data: {
            username,
            pwd,
        }
    })
        .then(res => {
            if (res === "true") {
                alert("登录成功");
                status.innerText = "状态：已登录";
                document.cookie = `username=${username}`
                document.cookie = `pwd=${pwd}`
                location.hash = "/person";
            } else if (res === "false") {
                alert("登录失败");
            }
        })
})

// 路由：
location.hash = '';
const route = {
    home: document.querySelector("#home"),
    person: document.querySelector("#person"),
}
window.addEventListener("hashchange", (e) => {
    console.log("hashchange: ", location.hash)
    switch (location.hash) {
        case "":
            route.person.style = "display: none";
            route.home.style = "display:block";
            break;
        case "#/person":
            route.home.style = "display: none";
            route.person.style = "display:block";
            break;
    }
})

// 判断是否有相关cookie
const cookies = document.cookie.split("; ");
cookies.map((cookie) => {
    cookie = cookie.split("=");
    if (cookie[0] === "username") {
        status.innerText = "状态：已登录";
        location.hash = "/person";
    }
})

// 个人页面
document.querySelector("#person .back").addEventListener("click", () => {
    location.hash = "";
})