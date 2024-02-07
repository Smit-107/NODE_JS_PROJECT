var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/registercontroller')
var auth = require("../middleware/checktiken")
/* GET home page. */
router.post('/register', registercontroller.register);
router.post('/userlogin', registercontroller.login);
router.get('/getuser',auth.check, registercontroller.get_user);
router.post('/logout',auth.check, registercontroller.logout);

module.exports = router;
