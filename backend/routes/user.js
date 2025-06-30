const express = require("express");
const router = express.Router();
const {registerUserController, authUserController, allUsersController} = require("../controllers/user");

const {protect} = require("../middlewares/auth")

router.post("/", registerUserController)
.get("/", protect, allUsersController);

router.post("/login", authUserController);


module.exports = router;