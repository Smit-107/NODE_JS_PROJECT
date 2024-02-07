var registermodel = require("../model/registermodel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_key = "1234567812345678123456781234567812345678"

exports.register = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;

  var data = await registermodel.create(req.body);
  // const token = jwt.sign({ userId: data._id, email: data.email }, secret_key, { expiresIn: '1h' });
  res.status(200).json({
    status: "success",
    data,
    // token,
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
    if (data.length == 1) {
      if (data[0].loggedIn) {
        res.status(200).json({
          status: "error",
          message: "User already logged in",
        });
      } 

      else {
        bcrypt.compare(req.body.password,data[0].password,async function (err, result){
          if (result == true) {
            await registermodel.findByIdAndUpdate(data[0]._id, { loggedIn: true });
            res.status(200).json({
              status: "Login Successful",
              data, 
            });
          } else {
            res.status(200).json({
              status: "error",
              message: "check email and password",
            });
          }
        });
      }

    } 
    else {
      res.status(200).json({
        status: "error",
        message: "User not found",
      });
    }
};



exports.logout = async (req, res) => {
    try {
      const email = req.body.email; 
  
      const user = await registermodel.findOne({ email });
        console.log('user',user);
      if (user) {
        await registermodel.findByIdAndUpdate(user._id, { loggedIn: false });
  
        res.status(200).json({
          status: 'success',
          message: 'User logged out successfully',
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };