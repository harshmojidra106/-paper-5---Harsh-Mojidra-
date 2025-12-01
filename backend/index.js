import experess from "express";
const app = experess();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const PORT = process.env.PORT || 5000;

import connectDB from "./common/database/database.js";
import authroute from "./modules/v1/auth/routes/authroute.js";
import productroute from "./modules/v1/product/routes/productroute.js";


app.use(experess.json());
app.use(experess.text());
app.use(cors());
connectDB()

app.use("/auth", authroute);
app.use("/product", productroute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



