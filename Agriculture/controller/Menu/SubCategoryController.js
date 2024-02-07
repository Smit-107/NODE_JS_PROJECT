const subCategory = require("../../model/Menu/SubCategoryModel");

exports.subInsert = async (req, res) => {
  try {
    req.body.image = req.file.originalname;
    var data = await subCategory.create(req.body);
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.subShow = async (req, res) => {
  try {
    let pageNo = req.query.pageNo;
    const totalData = await subCategory.find().count();
    const limit = 3;
    const totalPage = Math.ceil(totalData / limit);

    if (pageNo == undefined) {
      pageNo = 1;
    }

    if (pageNo > totalPage || pageNo <= 0) {
      pageNo = 1;
    }

    const skip = (pageNo - 1) * limit;

    const data = await subCategory
      .find()
      .limit(limit)
      .skip(skip)
      .populate("categoryId");
    res.status(200).json({
      status: "Success",
      data,
      totalData,
      totalPage,
      pageNo,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.subDelete = async (req, res) => {
  const id = req.params.id;
  try {
    var data = await subCategory.findByIdAndDelete(id);
    res.status(200).json({
      status: "Delete Succesfully",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.subUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    var data = await subCategory.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: "Upadate Succesfully",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getSubcategoryById = async (req, res) => {
    const selectedCategoryId = req.params.id;

  try {

    let pageNo = req.query.pageNo;
    const totalData = await subCategory.countDocuments({ categoryId: selectedCategoryId });
    const limit = 3;
    const totalPage = Math.ceil(totalData / limit);

    if (pageNo == undefined) {
      pageNo = 1;
    }

    if (pageNo > totalPage || pageNo <= 0) {
      pageNo = 1;
    }

    const skip = (pageNo - 1) * limit;

    const data = await subCategory
      .find({ categoryId: selectedCategoryId })
      .limit(limit)
      .skip(skip)
      .populate("categoryId");

    res.status(200).json({
      status: "Success",
      data,
      totalData,
      totalPage,
      pageNo,
      skip
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
