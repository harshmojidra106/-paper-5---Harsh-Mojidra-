import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productname:{
    type:String
  },
  price:{
    type:String
  },
  description:{
    type:String
  },
  quantity:{
    type:Number
  },
  category:{
    type:String
  },
  image:{
    type:String
  },
  publishby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})
const Product = mongoose.model("Product",ProductSchema)
export default Product;