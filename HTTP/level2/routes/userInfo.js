const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Welcome to usersInfo");
    // res.render('login', { title: "登录框" });
});

module.exports = router;
