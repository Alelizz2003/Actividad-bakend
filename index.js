require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const express = require('express');
const app = express();
const sequelize = require('./config/database');

app.use(express.json());

const productosRouter = require('./routes/productos');
const carritoRouter = require('./routes/carrito');
const authRouter = require('./routes/auth');

app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
app.use('/auth', authRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
  });
});
