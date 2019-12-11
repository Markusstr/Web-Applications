let Post = require("../models/Post");

exports.load = async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({"error": err});
    }
}

exports.save = async (req, res) => {
    console.log("Save");
    nimi = "Testi";
    const post = new Post({
        username: req.body.username,
        header: req.body.header,
        text: req.body.text
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(404).json({"error": err});
    }
};