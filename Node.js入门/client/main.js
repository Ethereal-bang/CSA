const dom = {
    chessboard: document.querySelector("div"),
    hint: document.querySelector('h2'),
    clean: document.querySelector('button'),
}

const playChess = {
    // 玩家- 1、2标识
    role: undefined,
    targetId: undefined,
    // 棋子布局
    arr: [[0, 0, 0,], [0, 0, 0,], [0, 0, 0]],
    // 下棋-判断是否已有棋子
    play(e) {
        this.targetId = e.target.id;
        let childNumber = e.target.childElementCount;
        if (childNumber === 0 && e.target.localName === 'div') {
            ws.send("target" + this.targetId);
        } else {
            alert('这个地方已经有棋了');
        }
    },
    // 渲染棋子-location落子位置
    render(location) {
        let span = document.createElement('span');
        // console.log(playChess.role)
        if (this.role === 1) {
            // 对勾 1
            span.setAttribute('class', 'player_one');
            span.innerText = "o";
            this.saveData(location, 1);
            this.role = 2;
        } else if (this.role === 2) {
            // 叉号 2
            span.setAttribute('class', 'player_two');
            span.innerText = "×";
            this.saveData(location, -1);
            this.role = 1;
        }
        document.querySelector('#' + location).appendChild(span);
    },
    // 保存数据-value要保存到数组的值
    saveData(location, value) {
        switch (location) {
            case "rowOne-colOne":
                this.arr[0][0] = value;
                break;
            case "rowOne-colTwo":
                this.arr[0][1] = value;
                break;
            case "rowOne-colThree":
                this.arr[0][2] = value;
                break;
            case "rowTwo-colOne":
                this.arr[1][0] = value;
                break;
            case "rowTwo-colTwo":
                this.arr[1][1] = value;
                break;
            case "rowTwo-colThree":
                this.arr[1][2] = value;
                break;
            case "rowThree-colOne":
                this.arr[2][0] = value;
                break;
            case "rowThree-colTwo":
                this.arr[2][1] = value;
                break;
            case "rowThree-colThree":
                this.arr[2][2] = value;
                break;
            default:
                break;
        }
    },
    // 每下一颗判断是否胜利或平局
    judge() {
        // 保存行、列、对角线的值
        let rowSum = 0, colSum = 0, diagonalOne = 0, diagonalTwo = 0;

        for (let i = 0; i < 3; i++) {
            rowSum = 0;
            colSum = 0;
            for (let j = 0; j < 3; j++) {
                rowSum += this.arr[i][j];
                colSum += this.arr[j][i];
                // 判断左上到右下对角线
                if (i === j) {
                    diagonalOne += this.arr[i][j];
                }
                // 判断右上到左下
                if (i + j === 2) {
                    diagonalTwo += this.arr[i][j];
                }
                // 判断行  判断列
                if (rowSum === 3 || colSum === 3 || diagonalOne === 3 || diagonalTwo === 3) {
                    dom.hint.innerText = '你赢了';
                } else if (rowSum === -3 || colSum === -3 || diagonalOne === -3 || diagonalTwo === -3) {
                    dom.hint.innerText = '对方赢了';
                }
            }
        }
    },
}

// 建立ws连接
let ws;
function connect() {
    ws = new WebSocket(`ws://localhost:8080`, 'echo-protocol');   // 根服务端对应
    ws.onopen = () => {console.log("open.")};
    ws.onmessage = (e) => {
        const {data} = e;
        console.log(`Message from server: ${data}`)
        // console.log(typeof data)
        if (data === "1") {
            // console.log("set role")
            playChess.role = 1;
        } else if (data === "2") {
            // console.log("set role")
            playChess.role = 2;
        }
    };
    ws.onerror = (e) => {console.log(e)}
    // 本人下棋
    dom.chessboard.addEventListener("click", (e) => {
        ws.send("play");
        // 监听服务端判断回合是否属于本人
        ws.addEventListener("message", (mes) => {
            if (mes.data === "wrong round") {
                dom.hint.innerText = "不是你的回合";
            } else {    // 本人回合
                dom.hint.innerHTML = "你：o<br>对方：x";
                // 渲染棋子
                playChess.play(e);
                // 判断结果
                playChess.judge();
            }
        }, {
            once: true, // 只触发一次
        });
    })
    // 有人落子
    ws.addEventListener("message", (mes) => {
        const { data } = mes;
        if (/location/g.test(data)) {
            playChess.render(data.slice(8));
            playChess.judge();
        }
    })
}
connect();

// 重开
// function restart() {
//     ws.close();
//     location.reload();
//     connect();
// }
// dom.clean.addEventListener("click", restart);
// window.onbeforeunload = ws.close;    // 页面刷新前触发
