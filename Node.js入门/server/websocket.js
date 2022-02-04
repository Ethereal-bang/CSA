const WebsocketServer = require("websocket").server;
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(404);
    res.end();
})
let playChess;
server.listen(8080, () => {
    console.log("Server is listening on port 8080");
    playChess = {
        num: 0,
        role: 1, // 1表示玩家1
    }
})

const wsServer = new WebsocketServer({
    httpServer: server,
    autoAcceptConnections: false,
})
// 判断源是否被允许连接 origin——请求的域
function originIsAllowed(origin) {
    return true;
}

wsServer.on("request", (req) => {
    // if (!originIsAllowed(req.origin)) {
    //     req.reject();
    //     // console.log(`Connection from origin ${req.origin} rejected.`);
    //     return;
    // }
    const connection = req.accept("echo-protocol", req.origin);
    let id;
    if (playChess.num === 1) {    // 已有1玩家
        playChess.num++;
        id = 2;
        connection.send(2);   // 发给玩家2
        wsServer.broadcast("游戏开始"); // 发给2个玩家
    } else if (playChess.num === 0){    // 没有玩家
        playChess.num++;
        id = 1;
        connection.send(1);
    } else {    // 已有两个
        connection.send("已有两玩家");
    }
    connection.on("message", (mes) => {
        mes = mes.utf8Data;
        console.log(`From ${id}: ${mes}`);
        console.log(playChess)    
        if (playChess.role === id) {    // 正确的回合
            wsServer.broadcast("right round");
            if (/target/g.test(mes)) {  // 落子
                wsServer.broadcast(`location${mes.slice(6)}`);  // 广播落子位置让两页面均渲染
                playChess.role = (playChess.role === 1) ? 2 : 1;
            }
        } else {
            wsServer.broadcast(`wrong round`);
        }
    })
    connection.on("close", (reasonCode, desc) => {
        console.log("disconnected.");
        playChess.num--;
    })
})