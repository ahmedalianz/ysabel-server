const router = require("express").Router();
const themeController = require("../controller/theme.controller");
const auth = require("../middleware/auth");

router.post("/makeTheme", themeController.makeTheme);
router.patch("/changeTheme", auth("Admin"), themeController.changeTheme);
router.get("/getTheme", themeController.getTheme);

module.exports = router;
