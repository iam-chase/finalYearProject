import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  addCustomer,
  deleteCustomer,
} from "../controllers/client.js";

const router = express.Router();

// Existing routes...
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

// Add routes for creating and deleting customers
router.post("/customers", addCustomer); 
router.delete("/customers/:id", deleteCustomer); 

export default router;
