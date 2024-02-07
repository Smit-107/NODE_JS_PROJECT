var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/userController');
const multer = require('multer');

// SET STORAGE
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
router.post('/register', upload.single('image'),registercontroller.register);
router.post('/userlogin', registercontroller.login);
router.get('/getuser', registercontroller.get_user);
router.post('/logout', registercontroller.logout);
router.put('/updateuser/:userId', upload.single('image'), registercontroller.updateUser);
router.delete('/deleteuser/:userId', registercontroller.deleteUser);

module.exports = router;
