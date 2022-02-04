# 局域网内井字棋对战
Node、WebSocket、Scss
启动：node 启动 server/websocket.js，开启两个页面方可对战。
## Client Side
1. 连接 websocket
2. 接收`role`编号存入
3. 提交落子请求
4. 接收消息渲染棋子 
5. 井字棋胜负逻辑判断
## Server Side
1. 对用户编号，只允许两个用户的连接。返回该用户`role`编号
2. 接收落子请求判断回合正确则广播落子

## 待完善
+ 重开对局
+ 正负后页面反馈