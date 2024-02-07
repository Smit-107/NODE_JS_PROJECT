var express = require('express');
var router = express.Router();
var registerController = require('../controller/registerController')


router.get('/',registerController.register_Info);
router.post('/register',registerController.register);
router.post('/forgotpassword',registerController.forgot_Password);

module.exports = router;
