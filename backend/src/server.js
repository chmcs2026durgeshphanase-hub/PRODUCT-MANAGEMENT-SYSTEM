import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import n from "node:dns/promises";
import productRoutes from "./routes/productRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

n.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/products`);
  });
});
