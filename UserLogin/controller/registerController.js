var registerModel = require('../model/registerModel');

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



exports.forgot_Password = async(req,res) => {
    try{
        const existingEmail = await registerModel.findOne({ email: req.body.email });

        if (!existingEmail) {
            return res.status(404).json({
                status: 'error',
                message: 'Email not found',
            });
        }
        else{
            const userId = existingEmail._id;
            console.log(userId);

            // await registerModel.findOneAndUpdate({ password: req.body.password });
            await registerModel.findOneAndUpdate(
                { email: req.body.email },
                { $set: { password: req.body.password } }
            );

            res.status(200).json({
                status: 'success',
                message: 'Password reset successful',
                userId,
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