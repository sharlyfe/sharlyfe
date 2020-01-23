const express = require("express");
//Router is a funmction in express
const router = express.Router();

router.get("/", (req, res) => {
  // instead of sending basic text we can render our view
  res.render("index");
});

module.exports = router;
