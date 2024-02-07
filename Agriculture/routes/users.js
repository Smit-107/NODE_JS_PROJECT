var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/userController')
var auth = require("../middleware/checktiken")
var taskcontroller = require('../controller/TaskController')
var seedController = require('../controller/seedController')
const SubCategoryController = require('../controller/Menu/SubCategoryController')


/* GET home page. */
router.post('/register',registercontroller.register);
router.post('/userlogin', registercontroller.login);
router.post('/logout',auth.check, registercontroller.logout);
router.post('/updateTask/:id',auth.check, taskcontroller.updateTask);

// router.post('/seedBSInsert',auth.check, seedController.seedBSInsert);
// router.post('/seedBSUpdate/:id',auth.check, seedController.seedBSUpdate);



router.get('/subCategory',auth.check, SubCategoryController.subShow);
router.get('/getSubCategory',auth.check, SubCategoryController.getSubcategoryById);





module.exports = router;
