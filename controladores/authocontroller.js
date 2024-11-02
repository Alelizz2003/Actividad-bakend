const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({ nombre, email, password: hashedPassword });
  res.status(201).json(nuevoUsuario);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !await bcrypt.compare(password, usuario.password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
