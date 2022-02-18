const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secret = "secretOrPrivateKeyXXXX"

exports.index = (req, res, next) => {
    // res.render("users", {
    //     title: "Users",
    // })
    res.sendFile("/index.html");
}

async function register(req, res, next) {
    // 生成token:
    const token = "Bearer " + jwt.sign(
        {   // 自定义信息
            username: req.query.name,
            admin: true,
        },
        secret,
        {
            expiresIn: 3600 * 24,    // 设置24h过期
        }
    )

    await User.create({
        name: req.query.name,
        pwd: req.query.pwd,
    })
        .then(data => {
            res.json({
                flag: true,
                token: token,
                info: data,
            })
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
        .findOne({ "name": req.query.name })
        .exec((err, data) => {
            // 账号不存在则自动注册，存在则验证密码登录
            if (!data) {
                register(req, res, next);
            } else {
                if (data.pwd !== req.query.pwd) {
                    res.json({
                        flag: false,
                        msg: "密码错误，登录失败！"
                    })
                } else {
                    data["flag"] = true;
                    res.json({
                        flag: true,
                        msg: "密码正确，登录成功！"
                    })
                }
            }
    })
}

