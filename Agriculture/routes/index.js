var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/adminController')
var usercontroller = require('../controller/userController')
var taskcontroller = require('../controller/TaskController')
var seedController = require('../controller/seedController')
var CategoryController = require('../controller/Menu/CategoryController')
var SubCategoryController = require('../controller/Menu/SubCategoryController')
const cartController = require("../controller/Menu/CartController");

var auth = require("../middleware/checktiken")



const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })



/* GET home page. */
router.post('/register', registercontroller.register);
router.post('/login', registercontroller.login);
router.get('/getuser',auth.check, usercontroller.get_user);
router.get('/getadmin',auth.check, registercontroller.get_user);
router.post('/logout', registercontroller.logout);
router.post('/inserTask/:id',auth.check, taskcontroller.insertTask);
router.post('/deleteTask/:id',auth.check, taskcontroller.deleteTask);
router.post('/updateTask/:id',auth.check, taskcontroller.updateTask);

// router.post('/seedInsert',auth.check, seedController.seedInsert);
// router.post('/seedDelete',auth.check, seedController.seedDelete);
// router.post('/seedUpdate',auth.check, seedController.seedUpdate);
// router.get('/seed',auth.check, seedController.seed);
// router.post('/seedAdd/:id', seedController.seedAdd);

// router.get('/seedBS',auth.check, seedController.seedBS);
// router.get('/seedBS/:id',auth.check, seedController.seedBSSingle);



router.post('/categoryInsert',auth.check, CategoryController.insert);
router.post('/categoryDelete/:id',auth.check, CategoryController.delete);
router.post('/categoryUpdate/:id',auth.check, CategoryController.update);
router.get('/category',auth.check, CategoryController.show);


router.post('/subCategoryInsert',upload.single('image'),auth.check, SubCategoryController.subInsert);
router.post('/subCategoryDelete/:id',auth.check, SubCategoryController.subDelete);
router.post('/subCategoryUpdate/:id',auth.check, SubCategoryController.subUpdate);
router.get('/subCategory', SubCategoryController.subShow);


router.get('/getSubCategory/:id', SubCategoryController.getSubcategoryById);


router.post("/addToCart", cartController.addToCart);
router.post("/updateQuantity", cartController.updateCartItemQuantity);
router.get("/cartsItems", cartController.getAllItemsInCart);
router.post('/placeOrder', cartController.placeOrder);
router.get('/userOrders', cartController.getUserOrders);



module.exports = router;
