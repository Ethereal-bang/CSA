const User = require("../models/user");

exports.index = (req, res, next) => {
    res.render("users", {
        title: "Users",
    })
}

async function register(req, res, next) {
    await User.create({
        name: req.query.name,
        pwd: req.query.pwd,
    })
        .then(data => {
            res.send("注册成功: " + data);
        })
        .catch(err => {
            res.render("error", {
                message: "Register",
                error: err,
            });
        })
}

exports.register = (req, res, next) => register(req, res, next);

exports.login = async (req, res, next) => {
    await User
        .findOne({ "name": req.query.name, "pwd": req.query.pwd })
        .exec((err, data) => {
            // 账号不存在则自动注册，存在则登录
            if (!data) {
                register(req, res, next);
            } else {
                res.send("登录成功: " + data);
            }
    })
}

