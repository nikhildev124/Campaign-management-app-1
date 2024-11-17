import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const shop = mongoose.model("Shop", shopSchema);
export default shop;
