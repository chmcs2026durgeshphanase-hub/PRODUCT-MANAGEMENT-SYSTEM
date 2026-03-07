import express from "express"
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct
} from "../controllers/productController.js"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProductByID)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router