import express from 'express';
import { productService } from '../services/product-service.js'; // Importación nombrada
import { cartService } from '../services/cart-service.js'; // Importación nombrada

const router = express.Router();

// Página principal
router.get('/', (req, res) => {
  res.render('home', { title: 'Página Principal' });
});

// Vista del carrito
router.get('/cart/:cartId', async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cart = await cartService.getCartById(cartId); // Obtener carrito desde la base de datos
    res.render('cart', { title: 'Carrito', products: cart.products });
  } catch (error) {
    next(error);
  }
});

// Vista de productos
router.get('/products', async (req, res, next) => {
  try {
    const products = await productService.getAll(); // Obtener productos desde la base de datos
    res.render('products', { title: 'Productos', products });
  } catch (error) {
    next(error);
  }
});

export default router;