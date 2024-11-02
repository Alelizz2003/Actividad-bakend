const Producto = require('../models/producto');

exports.getProductos = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};
