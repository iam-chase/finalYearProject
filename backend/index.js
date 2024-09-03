import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit"; // Import PDFKit for generating PDFs
import { fileURLToPath } from "url";

// Import routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoute.js";
import transactionRoutes from './routes/transactionRoutes.js';

// Data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
} from "./data/index.js";

// Convert __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/transactions", transactionRoutes);

/* REPORT GENERATION ROUTE */
app.get('/reports/transactions', async (req, res) => {
  try {
    // Fetch transactions from the database
    const transactions = await Transaction.find(); // Fetch transaction data from the database

    // Create a new PDF document
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'reports', 'transactions_report.pdf');

    // Stream the PDF directly to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions_report.pdf"');
    
    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(18).text("Transactions Report", { align: "center" });
    doc.moveDown();

    // Add the current date to the report
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });
    doc.moveDown();

    // Add transaction details dynamically
    transactions.forEach((tx, index) => {
      doc.fontSize(12).text(`Transaction ${index + 1}:`);
      doc.fontSize(10).text(`ID: ${tx._id}`);
      doc.text(`User ID: ${tx.userId}`);
      doc.text(`Cost: $${tx.cost}`);
      // Add other fields as needed
      doc.moveDown();
    });

    // End the document stream
    doc.end();
  } catch (error) {
    console.error("Error generating the report:", error);
    res.status(500).send("Error generating the report");
  }
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // Uncomment the below lines to add data one time
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
