let mongoose = require("mongoose");

let PostSchema = mongoose.Schema({
    username: String,
    header: String,
    text: String
});

module.exports = mongoose.model("Post", PostSchema);