import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderName: { type: String, required: true },
  orderEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  shopName: { type: String, required: true },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
