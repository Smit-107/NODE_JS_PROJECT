var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/userController')
var categoryController = require('../controller/categoryController')
var auth = require("../middleware/checktiken")


// user routes
router.post('/register', registercontroller.register);
router.post('/login', registercontroller.login);
router.post('/logout', registercontroller.logout);

router.get('/category',auth.check,categoryController.show);
router.get('/category/:categoryId',auth.check,categoryController.sub_show);
router.get('/subcategory/:subcategoryId',auth.check,categoryController.getSubmenusByMenuId);

module.exports = router;
