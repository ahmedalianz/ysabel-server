const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

//-----------------register/login for users -----------
// router.post("/register", userController.register);
router.post("/login", userController.login);

//-----------------register for admins -----------
router.post("/registerAdmin", userController.registerAdmin);

//---------------common actions between user/admin--------
router.get("/logout", auth("Both"), userController.logout);

//----------------user/admin options to contol his account---------
router.get("/me", auth("Both"), userController.profileShow);
router.patch("/editPassword", auth("Both"), userController.passwordEdit);

module.exports = router;
