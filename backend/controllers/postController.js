let Post = require("../models/Post");

exports.load = async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.remove = async (req, res) => {
    try {
        const post = await Post.deleteOne({_id: req.body.id});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
}

exports.save = async (req, res) => {
    const dateNow = new Date();
    const month = dateNow.getMonth()+1;
    let minute = dateNow.getMinutes();
    if (minute < 10) {
        minute = 0 + String(minute);
    }
    else {
        minute = String(minute);
    }
    const date = dateNow.getDate() + "." + month + "." + dateNow.getFullYear() + " " + dateNow.getHours() + ":" + minute;

    const post = new Post({
        username: req.body.username,
        text: req.body.text,
        date: date
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
};