const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 6,
        unique: true,
    },
    pwd: {
        type: String,
        required: true,
        max: 6,
    }
});

module.exports = mongoose.model("User", UserSchema);