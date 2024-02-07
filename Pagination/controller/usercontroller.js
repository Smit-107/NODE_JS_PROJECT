var usermodel = require('../model/usermodel')

exports.insert = async(req,res) =>{
    var data = await usermodel.create(req.body);
    res.status(200).json({
        status:'success',
        data
    })
}

exports.data_show = async(req,res) =>{

    var page_no = req.query.page_no;
    var total_data = await usermodel.find().count()
    var limit = 3;
    var total_page = Math.ceil(total_data/limit);

    if (page_no==undefined) {
        page_no= 1;
    }

    if (page_no>total_page || page_no<=0) {
        page_no= 1; 
    }

    var skip = (page_no-1)*limit;

    var data = await usermodel.find().limit(limit).skip(skip);


    res.status(200).json({
        status:'success',
        data,total_data,total_page
    })
}