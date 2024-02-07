var registermodel = require("../model/userModel");
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');


exports.register = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;




  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'smitghevariya107@gmail.com',
      pass: 'vkkrllbrvgtpgrnq'
    }
  });
  
  var mailOptions = {
    from: 'smitghevariya107@gmail.com',
    to: 'smitghevariya710@gmail.com',
    subject: 'User info',
    text: 'User Register Sucessfully'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });






  var data = await registermodel.create(req.body);
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



function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }



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

            const otp = generateOTP();
            
            await registermodel.findByIdAndUpdate(data[0]._id, { loggedIn: true });
            res.status(200).json({
              status: "Login Successful",
              data, 
            });

          }
          else {
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


async function verifyOTP(userId, userOTP) {
    try {
      const user = await registermodel.findById(userId);
      return user && user.otp === userOTP;
    } catch (error) {
      console.error(error);
      return false;
    }
  } 


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