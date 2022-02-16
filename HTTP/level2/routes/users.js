var express = require('express');
var router = express.Router();

// 导入控制器模块
const user_controller = require("../controllers/userController");

router.get('/', user_controller.index);

router.get("/login", user_controller.login);

module.exports = router;
