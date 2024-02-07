var menumodel=require('../model/MenuModel')
var submenumodel=require('../model/SubMenuModel')

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


exports.sub_insert = async (req,res) =>{
    try{
        var data = await submenumodel.create(req.body);
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
        var data = await submenumodel.find().populate("menu_id");
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
        const selectedMenuId = req.params.menuId;
        const data = await submenumodel.find({ menu_id: selectedMenuId }).populate("menu_id");

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


