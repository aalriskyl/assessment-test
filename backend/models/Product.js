const db = require('../config/db');

class Product {
  static async findAll(searchQuery = '') {
    let query = 'SELECT * FROM products';
    const params = [];
    
    if (searchQuery) {
      query += ' WHERE name ILIKE $1';
      params.push(`%${searchQuery}%`);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const { rows } = await db.query(query, params);
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows.length ? rows[0] : null;
  }

  static async create(data) {
    const { name, description, price } = data;
    const { rows } = await db.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name, description, price]
    );
    return rows[0];
  }

  static async update(id, data) {
    const { name, description, price } = data;
    const { rows } = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );
    return rows.length ? rows[0] : null;
  }

  static async delete(id) {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

module.exports = Product;
