const category = require('../../model/Menu/CategoryModel')

exports.insert = async (req,res) =>{

    try{
        var data = await category.create(req.body);
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
        var data = await category.find();
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


exports.delete = async (req,res) =>{
    const id = req.params.id
    try{
        var data = await category.findByIdAndDelete(id);
        res.status(200).json({
            status:'Delete Succesfully',
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


exports.update = async (req,res) =>{
    const id = req.params.id
    try{
        var data = await category.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            status:'Upadate Succesfully',
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