import Product from "../../../../model/Product.js";
import mongoose from "mongoose";

const productmodule = {
  async addproduct(req, res) {
    try {
      const {
        productname,
        price,
        description,
        category,
        quantity,
        image,
        publishby,
      } = req.body;
    
      if ( !price || !productname || !quantity || !publishby) {
        return res.status(400).json({ msg: "all fields are required" });
      }
      
      if (!mongoose.Types.ObjectId.isValid(publishby)) {
        return res.status(400).json({ msg: "invalid publishby ID" });
      }
      const newproduct = new Product({
        productname,
        price,
        description,
        category,
        quantity,
        image,
        publishby,
      });
      await newproduct.save();
      return res.status(200).json({ msg: "product added successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "internal server error" });
    }
  },
  async getallproduct(req, res) {
    try {
      const allproduct = await Product.find();
      if (!allproduct) {
        return res.status(400).json({ msg: "no product found" });
      }
      return res.status(200).json(allproduct);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "internal server error" });
    }
  },
};
export default productmodule;
