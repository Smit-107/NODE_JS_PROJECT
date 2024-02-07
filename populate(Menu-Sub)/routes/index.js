var express = require('express');
var router = express.Router();
var menucontroller = require('../controller/MenuController');
/* GET home page. */
router.post('/menu',menucontroller.insert);
router.post('/submenu',menucontroller.sub_insert);
router.get('/menu',menucontroller.show);
router.get('/submenu',menucontroller.sub_show);
router.get('/submenus/:menuId', menucontroller.getSubmenusByMenuId);

module.exports = router;
