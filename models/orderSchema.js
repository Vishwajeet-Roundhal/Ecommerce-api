const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({
  orderDetails: [
    {
      id: {type : String , required: true}, //productId from product model
      name: { type: String, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      user: { type: String, required: true },
      color: {type: String, required: true},
      userId: { type: String , required: true},
      // Add other fields as needed
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  }, 
  createdAt: { type: Date, default: Date.now },

});



const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
