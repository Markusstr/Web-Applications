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

exports.save = async (req, res) => {
    const post = new Post({
        username: req.body.username,
        text: req.body.text,
        date: req.body.date
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(404).json({error: err});
    }
};