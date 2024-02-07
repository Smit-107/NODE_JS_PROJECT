// const jwt = require('jsonwebtoken');
// const secret_key = "1234567812345678123456781234567812345678"


// exports.check = async(req,res,next) =>{

//     const token = req.cookies.authToken || req.headers.authorization;

//     jwt.verify(token,secret_key,next);
    
// }



const jwt = require('jsonwebtoken');
const secret_key = "1234567812345678123456781234567812345678"
const storage = require('node-persist');



exports.check = async(req,res,next) =>{

    await storage.init();
    const users_Token = await storage.getItem('user_Token');
    const admin_Token = await storage.getItem('admin_Token');
    const token = req.headers.authorization;


    if (token === admin_Token) {
         jwt.verify(token,secret_key,next);
    } else if (token === users_Token) {
         jwt.verify(token,secret_key,next);
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
}
