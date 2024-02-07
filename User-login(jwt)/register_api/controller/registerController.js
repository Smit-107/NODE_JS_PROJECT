var registerModel = require('../model/registerModel');
const jwt = require('jsonwebtoken');

const secret_key = "1234567812345678123456781234567812345678";

exports.register_Info = async(req,res) => {
    try{
        data = await registerModel.find();
        res.status(200).json({
            status:"User register information get successfully",
            data,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

exports.register = async (req,res) =>{
    try{
        const existingEmail = await registerModel.findOne({ email: req.body.email });
        const existingUserName = await registerModel.findOne({ userName: req.body.userName });
        console.log("existingEmail",existingEmail);
        console.log("existingUserName",existingUserName);
        const errorMessage = existingEmail? 'User already exists with the provided email': existingUserName ? 'User already exists with the provided username': null;

        if (existingEmail || existingUserName) {
            return res.status(400).json({
                status: 'error',
                message: errorMessage,
            });
        }

        else{
            newUser = await registerModel.create(req.body);
            res.status(200).json({
                status:"User Register Sucessful",
                data:newUser,
            })
        }

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

exports.login = async(req,res) =>{
    try{
        const existingEmail = await registerModel.findOne({email:req.body.email});
        console.log("existingEmail",existingEmail);

        if (existingEmail) {
            if (existingEmail.password == req.body.password) {

                const accessToken = jwt.sign({ userId: existingEmail._id }, secret_key, { expiresIn: '1m' });
                const refreshToken = jwt.sign({ userId: existingEmail._id }, secret_key, { expiresIn: '1d' });

              res.status(200).json({
                  status: 'sucess',
                  message: 'Login Sucessfully',
                  existingEmail,
                  accessToken,
                  refreshToken
              });
            }
            else{
                res.status(400).json({
                    status:'Password is not Match'
                })
            }
        }
        else
        {
            res.status(400).json({
                status:'Email not Exist'
            })
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

exports.refreshAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            status: 'error',
            message: 'Refresh token is required',
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, secret_key);
        console.log(decoded);
        const accessToken = jwt.sign({ userId: decoded.userId }, secret_key, { expiresIn: '1m' });

        res.status(200).json({
            status: 'success',
            message: 'Access token refreshed successfully',
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            status: 'error',
            message: 'Invalid refresh token',
        });
    }
};