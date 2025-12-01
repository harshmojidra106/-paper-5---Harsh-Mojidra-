import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
