var express = require('express');
var router = express.Router();
var registerController = require('../controller/registerController')
const cors = require('cors');
var authController = require("../middleware/checktiken")

const corsOptions ={
    // origin:'http://localhost:3000', 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));   

router.get('/', authController.check, registerController.register_Info);
router.post('/register', registerController.register);
router.post('/login', registerController.login);
router.post('/refreshToken', registerController.refreshAccessToken);

module.exports = router;
