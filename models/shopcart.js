const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./producto');
const Usuario = require('./usuario');

const Carrito = sequelize.define('Carrito', {
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  productoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id',
    },
  },
});

module.exports = Carrito;
