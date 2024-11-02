const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, carritoController.addProducto);
router.delete('/:id', authMiddleware, carritoController.removeProducto);

module.exports = router;
