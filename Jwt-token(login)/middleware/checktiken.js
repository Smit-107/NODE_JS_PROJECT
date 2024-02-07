const jwt = require('jsonwebtoken');
const secret_key = "1234567812345678123456781234567812345678"


exports.check = async(req,res,next) =>{

    const token = req.cookies.authToken || req.headers.authorization;

    jwt.verify(token,secret_key,next);
    
}