let User = require("../models/User");

exports.load = async (req, res) => {
    try {
        const post = await User.find({username: req.username});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({"error": err});
    }
}