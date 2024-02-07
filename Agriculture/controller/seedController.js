var seedController = require("../model/seedModel");
var seedBSController = require("../model/seedBSModel");
const secret_key = "1234567812345678123456781234567812345678";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("util");

exports.seedInsert = async (req, res) => {
  req.body.seedsPrice = req.body.seedsPrice + "/kg";
  var data = await seedController.create(req.body);
  res.status(200).json({
    status: "success",
    data,
  });
};
exports.seed = async (req, res) => {
  var data = await seedController.find();
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.seedDelete = async (req, res) => {
  var id = req.params.id;
  var data = await seedController.findByIdAndDelete(id);
  res.status(200).json({
    status: "Delate successfully",
  });
};

exports.seedUpdate = async (req, res) => {
  const id = req.params.id;
  req.body.seedsPrice = req.body.seedsPrice + "/kg";
  var data = await seedController.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "success",
    data,
  });
};

function generateRandomId() {
  return crypto.randomBytes(6).toString("hex");
}

exports.seedBSInsert = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, secret_key);
  req.body.userId = decodedToken.userId;

  req.body.applicationId = generateRandomId();
  const seed = await seedController.findById(req.body.seedsId);

  if (req.body.buyerQuantity) {
    const buyerQuantityInt = parseInt(req.body.buyerQuantity);
    var data = await seedBSController.create(req.body);
    await seedController.findByIdAndUpdate(req.body.seedsId, {
      seedsQuantity:
        (parseInt(seed.seedsQuantity) - buyerQuantityInt).toString() + "kg",
    });
    res.status(200).json({
      status: "success",
      data,
    });
  }
  if (req.body.sellerQuantity) {
    const sellerQuantityInt = parseInt(req.body.sellerQuantity);
    var data = await seedBSController.create(req.body);
    await seedController.findByIdAndUpdate(req.body.seedsId, {
      seedsQuantity:
        (parseInt(seed.seedsQuantity) + sellerQuantityInt).toString() + "kg",
    });
    res.status(200).json({
      status: "success",
      data,
    });
  }
};

exports.seedBSUpdate = async (req, res) => {
  const id = req.params.id;
  const seedBS = await seedBSController.findById(id);
  const seed = await seedController.findById(seedBS.seedsId);

  if (req.body.buyerQuantity) {
    const originalBuyerQuantityInt = parseInt(seedBS.buyerQuantity);

    var data = await seedBSController.findByIdAndUpdate(id, req.body);

    const buyerQuantityInt = parseInt(req.body.buyerQuantity);

    await seedController.findByIdAndUpdate(seedBS.seedsId, {
      seedsQuantity:
        (
          parseInt(seed.seedsQuantity) +
          originalBuyerQuantityInt -
          buyerQuantityInt
        ).toString() + "kg",
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } else if (req.body.sellerQuantity) {
    const originalsellerQuantityInt = parseInt(seedBS.sellerQuantity);
    var data = await seedBSController.findByIdAndUpdate(id, req.body);

    const sellerQuantityInt = parseInt(req.body.sellerQuantity);

    await seedController.findByIdAndUpdate(seedBS.seedsId, {
      seedsQuantity:
        (
          parseInt(seed.seedsQuantity) +
          originalsellerQuantityInt -
          sellerQuantityInt
        ).toString() + "kg",
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } else {
    var data = await seedBSController.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: "success",
      data,
    });
  }
};

exports.seedAdd = async (req, res) => {
  const id = req.params.id;
  const seed = await seedController.findById(id);

  await seedController.findByIdAndUpdate(id, {
    seedsQuantity:
      (
        parseInt(seed.seedsQuantity) + parseInt(req.body.quantityAdd)
      ).toString() + "kg",

    seedsPrice:
      (parseInt(seed.seedsPrice) + parseInt(req.body.priceAdd)).toString() +
          "/kg",
  });
  res.status(200).json({
    status: "success",
  });
};

exports.seedBS = async (req, res) => {
  var data = await seedBSController.find().populate("seedsId");
  res.status(200).json({
    status: "success",
    data,
  });
};

exports.seedBSSingle = async (req, res) => {
  const applicationId = req.body.applicationId;
  var data = await seedBSController
    .findOne({ applicationId })
    .populate("seedsId");
  res.status(200).json({
    status: "success",
    data,
  });
};
