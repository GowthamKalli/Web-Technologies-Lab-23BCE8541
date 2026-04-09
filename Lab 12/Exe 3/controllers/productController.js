const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
