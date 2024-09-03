import Product from "../models/Product.js";
export const createProduct = async (req, res) => {
    try {
      const { name, price, description, category} = req.body
      const products = await Product.create({name, price, description, category})
      return res.status(201).json({msg:"Success", products});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  export const getProducts =  async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 export const getASingleProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  export const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Returns the updated document
      );
      if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const deleteProduct =  async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }