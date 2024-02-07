var taskController = require("../model/TaskModel");

exports.insertTask = async (req, res) => {
     
    req.body.status = 'pending' 
  
    var data = await taskController.create(req.body);
    res.status(200).json({
      status: "success",
      data, 
    });
  };




  
exports.deleteTask= async(req,res) => {
    var id = req.params.id;
    var data = await taskController.findByIdAndDelete(id);
    res.status(200).json({
        status:'Delate successfully'
    })
}

exports.updateTask = async(req,res) => {

    var id = req.params.id;
    var data = await taskController.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:'Update successfully'
    })
}