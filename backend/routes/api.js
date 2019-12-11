let express = require("express"),
    cors = require("cors"),
    router = express.Router();

let postController = require("../controllers/postController");
let userController = require("../controllers/userController");

//const { validationResult } = require("express-validator");

router.get("/getPosts", cors(), (req, res) => {
    postController.load(req, res);
});

router.post("savePost", cors(), (req, res) => {
    postController.save(req, res);
})

router.get("/getUser", cors(), (req, res) => {
    userController.load(req, res);
})

router.post("/saveUser", cors(), (req, res) => {
    userController.save(req, res);
})

/*router.post("/saveStatus", (req, res) => {
    //const error = validationResult(req);
    gameController.save(req, res);
});*/

module.exports = router;