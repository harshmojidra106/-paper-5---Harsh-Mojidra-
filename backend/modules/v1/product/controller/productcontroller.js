import productmodule from "../module/productmodule.js";


const productcontroller = {
 async addproduct(req,res){
    return await productmodule.addproduct(req,res)
},
async getallproduct(req, res){
  return await productmodule.getallproduct(req, res)
}
}
export default productcontroller; 