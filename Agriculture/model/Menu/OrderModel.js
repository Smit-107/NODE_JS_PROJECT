const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory', // Reference to the SubCategory model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed for your specific use case
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
