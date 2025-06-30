const express = require('express');
const router = express.Router();
const {indexController, idController} = require('../controllers/index');


router.get("/chat", indexController)
router.get("/chat/:id", idController)


module.exports = router;