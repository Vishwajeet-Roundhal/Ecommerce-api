const express = require("express")
const router = express.Router();
const authController = require("../Controllers/auth-controller");
const contactController = require("../Controllers/contact-controller")
const {userAuth} = require("../Middlewares/auth-middleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login)
router.route("/user").get(userAuth, authController.getUserData);

//contact routes
router.route("/contact").post(contactController.createContact)

module.exports = router
