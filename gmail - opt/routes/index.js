var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/userController')
/* GET home page. */
router.post('/register', registercontroller.register);
router.post('/userlogin', registercontroller.login);
router.get('/getuser', registercontroller.get_user);
router.post('/logout', registercontroller.logout);

module.exports = router;
