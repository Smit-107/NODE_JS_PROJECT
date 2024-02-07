var registermodel = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_key = "1234567812345678123456781234567812345678"
const storage = require('node-persist');
exports.register = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;

  var data = await registermodel.create(req.body);
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.get_user = async (req, res) => {
  var data = await registermodel.find();
  res.status(200).json({
    status: "success",
    data,
  });
};


exports.login = async (req, res) => {

  var data = await registermodel.find({ email: req.body.email });
  await storage.init();

  var admin = await storage.getItem('admin_Token');

  console.log("admin",admin);

    if(admin === undefined){
      if (data.length > 0) {
        bcrypt.compare(req.body.password,data[0].password,async function (err, result){
          if (result == true) {
            const token = jwt.sign({ userId: data[0]._id }, secret_key);

            await storage.setItem('admin_Token',token)

            
          res.status(200).json({
            status: 'Login Successful',
            data,
            token
          })
          } else {
            res.status(400).json({  
              status: "error",
              message: "check email and password",
            });
          }
        });
      } 
      else {
        res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
    }
    else{
      res.status(400).json({
        status: "error",
        message: "User already login",
      });
    }
};


exports.logout = async (req, res) => {
  await storage.init();
  await storage.removeItem('admin_Token');
  res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
};