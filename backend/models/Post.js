let mongoose = require("mongoose");

let PostSchema = mongoose.Schema({
    username: String,
    text: String,
    date: String
});

module.exports = mongoose.model("Post", PostSchema);