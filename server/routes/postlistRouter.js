const { route, post } = require(".");
const postlistCtrl = require("../controler/postlistcontrol");

const router = require("express").Router();

router.route("/").get(postlistCtrl.getPost);
router.route("/").post(postlistCtrl.insertPost);
router.route("/:id").post(postlistCtrl.deletePost);
router.route("/:id/edit").post(postlistCtrl.changeTextPost);
router.route("/:id/editcommend").post(postlistCtrl.insertcommend);
router.route("/:id/delCommend").post(postlistCtrl.deletecommend);
//   .post(postlistCtrl.inputPost);

// router.get("/", (req, res) => {
//   res.send({ test: "this is test!!" });
// });

module.exports = router;
