import express from "express"
import verifyToken from "../../../../common/middleware/middleware.js"
import productcontroller from "../controller/productcontroller.js"; 
const router = express.Router();

router.post("/addproduct",verifyToken,productcontroller.addproduct)
router.get("/getallproduct", productcontroller.getallproduct)

 export default router;