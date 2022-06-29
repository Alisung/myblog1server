let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send({ test: "this is test!!" });
});

module.exports = router;
