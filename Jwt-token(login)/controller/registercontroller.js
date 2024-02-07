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

  const refreshTokenCookie = req.cookies.authToken;
  const authorizationHeader = req.headers.authorization;

  // if (!refreshTokenCookie && !req.headers.authorization) {

  var data = await registermodel.find({ email: req.body.email });
    if(!req.headers.authorization){
      // if (!refreshTokenCookie && !authorizationHeader) {
      if (data.length == 1) {
        bcrypt.compare(req.body.password,data[0].password,async function (err, result){
          if (result == true) {

            const token = jwt.sign({ userId: data[0]._id }, secret_key, { expiresIn: '10m' });
            // const accessToken = jwt.sign({ userId: data[0]._id }, secret_key, { expiresIn: '1m' });
            // const refreshToken = jwt.sign({ userId: data[0]._id }, secret_key, { expiresIn: '7d' });

            // Send both access and refresh tokens
          // res.cookie('authToken', refreshToken, { httpOnly: true });
          res.status(200).json({
            status: 'Login Successful',
            data,
            // accessToken,
            // refreshToken,
            token
          })

            // res.status(200).json({
            //   status: "Login Successful",
            //   data, token
            // });

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
  try {
    // Clear the 'authToken' cookie to log the user out
    res.clearCookie('authToken');

    res.status(200).json({
      status: 'success',
      message: 'Logout successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',   
    });
  }
};