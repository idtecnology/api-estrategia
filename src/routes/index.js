const { Router } = require("express");
const router = Router();

//Raiz
router.get("/", (req, res) => {
  res.json({
    Title: "API ONLINE",
  });
});

module.exports = router;
