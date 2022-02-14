const http = require("http");
const querystring = require("querystring");
const mysql = require("mysql");

const hostname = '127.0.0.1';
const port = 3000;

const connection = mysql.createConnection({
    host: hostname,
    user: "root",
    password: "theday1012",
    database: "testForNode",
    multipleStatements: true,   // 允许一个query有多个MySQL语句
});

connection.connect();

http.createServer((req, res) => {
    const { url, method } = req;
    const path = url.split("?")[0];
    const query = querystring.parse(url.split("?")[1]);
    const responseData = {
        url,
        method,
        path,
        query,
    };
    // 搭建路由
    switch (path) {
        case "/":
            res.end("Hello");
            break;
        case "/isUserExist":
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // 解决跨域
            });
            new Promise(resolve => {
                // 连接数据库
                const sql = "SELECT username FROM userList WHERE username = (?)";
                connection.query(sql, [responseData.query.username], (err, result) => {
                    if (err) {
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                    }
                    resolve(JSON.stringify(result));
                });
            })
                .then(data => {
                    if (data.length !== 2)    // []表示不存在该账户
                        res.end("true");
                    else
                        res.end("false")
                })
            break;
        case "/register":
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // 解决跨域
            });
            new Promise((resolve, reject) => {
                const sql = "INSERT userList VALUES (?,?)";
                connection.query(sql, [responseData.query.username, responseData.query.pwd], (err, result) => {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    resolve(true);
                });
            })
                .then(data => {
                    res.end("true");
                })
                .catch(err => {
                    res.end(err);
                })
            break;
        case "/login":
            new Promise((resolve, reject) => {
                const sql = "SELECT * FROM userList WHERE username = ? AND pwd = ?";
                connection.query(sql, [responseData.query.username, responseData.query.pwd], (err, result) => {
                    if (err) {
                        reject(JSON.stringify(err.message));
                        return;
                    }
                    resolve(JSON.stringify(result));
                });
            })
                .then(data => {
                    if (data.length === 2) {
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*", // 解决跨域
                        });
                        res.end("false");
                    } else {
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*", // 解决跨域
                            // "Set-Cookie": `userInfo={
                            // 'username':${responseData.query.username},
                            // 'pwd':${responseData.query.pwd}}`,
                            "Set-Cookie": `username:${responseData.query.username},pwd:${responseData.query.pwd}`
                        });
                        res.end("true");
                        // res.
                    }
                })

            break;
        case "/showUser":
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // 解决跨域
            });
            new Promise(resolve => {
                // 连接数据库
                const sql = "SELECT `username` FROM userList";
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                    }
                    resolve(JSON.stringify(result));
                });
            })
                .then(data => {
                    res.end(data);
                })
            break;
        default:
            res.writeHead(404, {
                "Content-Type": "application/json",
            });
            res.end("404 Not Found")
    }
})
    .listen(port, hostname, () => {
    console.log(`服务器运行于: http://${hostname}:${port}`);
});
