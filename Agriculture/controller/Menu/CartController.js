const Cart = require("../../model/Menu/CartModel");
const SubCategory = require("../../model/Menu/SubCategoryModel");
const Order = require("../../model/Menu/OrderModel");
const jwt = require("jsonwebtoken");
const secret_key = "1234567812345678123456781234567812345678";

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret_key);
    req.body.userId = decodedToken.userId;
    const userId = decodedToken.userId;
    const existingCartItem = await Cart.findOne({ productId, userId });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      await Cart.create({ productId, userId, quantity: 1 });
    }

    res.status(200).json({
      status: "Success",
      message: "Item added to the cart",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getAllItemsInCart = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret_key);
    const userId = decodedToken.userId;

    const cartItems = await Cart.find({ userId }).populate("productId");

    res.status(200).json({
      status: "Success",
      data: cartItems,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret_key);
    const userId = decodedToken.userId;

    const existingCartItem = await Cart.findOne({ productId, userId });
    if (existingCartItem) {
      if (action === "increment") {
        existingCartItem.quantity += 1;
      } else if (action === "decrement" && existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      }

      await existingCartItem.save();

      res.status(200).json({
        status: "Success",
        message: `Item quantity ${
          action === "increment" ? "increased" : "decreased"
        } in the cart`,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item not found in the cart",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


exports.placeOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret_key);
    const userId = decodedToken.userId;

    // Get cart items for the user
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Cart is empty. Cannot place an order with an empty cart.",
      });
    }

    // Create an order with the cart items
    const order = new Order({
      userId,
      items: cartItems.map((cartItem) => ({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      })),
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart after creating the order
    await Cart.deleteMany({ userId });

    res.status(200).json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret_key);
    const userId = decodedToken.userId;

    // Retrieve orders for the user
    const userOrders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.status(200).json({
      status: "Success",
      data: userOrders,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};