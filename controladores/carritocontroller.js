const Carrito = require('../models/carrito');

exports.addProducto = async (req, res) => {
  const { usuarioId, productoId } = req.body;
  const nuevoProducto = await Carrito.create({ usuarioId, productoId });
  res.status(201).json(nuevoProducto);
};

exports.removeProducto = async (req, res) => {
  const { id } = req.params;
  await Carrito.destroy({ where: { id } });
  res.status(200).json({ message: 'Producto eliminado del carrito' });
};
