var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/userController')
var admincontroller = require('../controller/adminController')
var categoryController = require('../controller/categoryController')
var auth = require("../middleware/checktiken")


// admin routes
router.post('/register', admincontroller.register);
router.post('/login', admincontroller.login);
router.post('/logout', admincontroller.logout);

router.post('/categoryinsert',auth.check,categoryController.insert);
router.post('/subcategoryinsert',auth.check,categoryController.sub_insert);
router.get('/',auth.check, registercontroller.get_user);
router.get('/winner',auth.check, categoryController.winner);


// // user routes
// router.post('/register', registercontroller.register);
// router.post('/userlogin', registercontroller.login);

// router.get('/category',auth.check,categoryController.show);
// router.get('/category/:categoryId',auth.check,categoryController.sub_show);
// router.get('/subcategory/:subcategoryId',auth.check,categoryController.getSubmenusByMenuId);

module.exports = router;
