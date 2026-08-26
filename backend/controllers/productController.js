const Product = require('../models/Product');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { search } = req.query;
      const products = await Product.findAll(search);
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createProduct(req, res) {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    try {
      const newProduct = await Product.create({ name, description, price });
      res.status(201).json(newProduct);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    try {
      const checkProduct = await Product.findById(id);
      if (!checkProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await Product.update(id, { name, description, price });
      res.json(updatedProduct);
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    
    try {
      const checkProduct = await Product.findById(id);
      if (!checkProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await Product.delete(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ProductController();
