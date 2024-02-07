var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/usercontroller')
/* GET home page. */
router.post('/insert', usercontroller.insert);
router.get('/', usercontroller.data_show);

module.exports = router;
