var menumodel=require('../model/category')
var submenumodel=require('../model/subCategory')
const secret_key = "1234567812345678123456781234567812345678"
const jwt = require('jsonwebtoken');
const storage = require('node-persist');

exports.insert = async (req,res) =>{
    try{
        var data = await menumodel.create(req.body);
        res.status(200).json({
            status:'Success',
            data
        })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

const generateRandomString = (subcategoryName) => {
    let result = '';
    let final = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 16 - subcategoryName.length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result += subcategoryName;

    // console.log("result",result);
    
    while (result.length > 0) {
        var randomIndex = Math.floor(Math.random() * result.length);
        final += result.charAt(randomIndex);
        result = result.slice(0, randomIndex) + result.slice(randomIndex + 1);
      }

    // console.log("final",final);


    return final;
};


exports.sub_insert = async (req,res) =>{
    try{
        var data = await submenumodel.create(req.body);

        const subcategoryName = req.body.subcategoryName;
        if(subcategoryName){
            const puzzleString = generateRandomString(subcategoryName);
            if(puzzleString){
                data.puzzleString = puzzleString;
                await data.save();
            }
        }

        res.status(200).json({
            status:'Success',
            data
        })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

exports.show = async (req,res) =>{
    try{
        var data = await menumodel.find();
        res.status(200).json({
            status:'Success',
            data
        })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}


exports.sub_show = async (req, res) => {
    try {
        const selectedMenuId = req.params.categoryId;
        console.log("selectedMenuId",selectedMenuId);
        var data = await submenumodel.find({ categoryId: selectedMenuId }).populate("categoryId");
        res.status(200).json({
            status: 'Success',
            data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// New route to fetch submenus based on the selected menu's ID
exports.getSubmenusByMenuId = async (req, res) => {
    try {
        const selectedMenuId = req.params.subcategoryId;
        const data = await submenumodel.find({ _id: selectedMenuId }).populate("categoryId");

        res.status(200).json({
            status: 'Success',
            data
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

var winnerArray = []
exports.winner = async (req, res) => {
    try {
        const token = req.headers.authorization;
        await storage.init();
        const users_Token = await storage.getItem('users_Token');
        const admin_Token = await storage.getItem('admin_Token');

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized: Token missing',
            });
        }

        if(token === users_Token){
            
            const decodedToken = jwt.verify(token,secret_key);
            const userId = decodedToken.userId;
            const selectedMenuId = req.body.subcategoryId;

            await submenumodel.findByIdAndUpdate(
                selectedMenuId,
                { $addToSet: { winId: userId } },
            );
            res.status(200).json({
                status: 'Update Succesful',
            });
        }
        
        else if (token === admin_Token){
            var data = await submenumodel.find();
            res.status(200).json({
                status:'Success',
                data
            })
            return;
        }
        // console.log(winnerArray); 
    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}