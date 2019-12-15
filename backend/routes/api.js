let express = require("express"),
    router = express.Router();

let postController = require("../controllers/postController");
let userController = require("../controllers/userController");

//const { validationResult } = require("express-validator");

router.get("/getPosts", (req, res) => {
    postController.load(req, res);
});

router.post("/removePost", (req, res) => {
    postController.remove(req, res);
});

router.post("/savePost", (req, res) => {
    postController.save(req, res);
});

router.post("/getUser", (req, res) => {
    userController.loadUser(req, res);
});

router.post("/getUserByID", (req, res) => {
    userController.loadUserByID(req, res);
});

router.post("/checkUser", (req, res) => {
    userController.checkUser(req, res);
});

router.post("/saveUser", (req, res) => {
    userController.saveUser(req, res);
});

router.post("/updateID", (req, res) => {
    userController.updateID(req, res);
});

/*router.post("/saveUser", (req, res) => {
    userController.save(req, res);
})*/

/*router.post("/saveStatus", (req, res) => {
    //const error = validationResult(req);
    gameController.save(req, res);
});*/

module.exports = router;