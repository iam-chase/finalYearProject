import express from "express"
import { createProduct, getASingleProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/", createProduct)
router.get("/", getProducts)
router.patch("/:id", updateProduct)
router.delete("/:id")

export default router