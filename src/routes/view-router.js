import express from 'express';
import { productRepository } from '../repositories/product.repository.js'; 
import { cartRepository } from '../repositories/cart.repository.js'; 

const router = express.Router();

// Página principal
router.get('/', (req, res) => {
  res.render('home', { title: 'Página Principal' });
});

// Vista del carrito
router.get('/cart/:cartId', async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cart = await cartRepository.getCartById(cartId); 
    res.render('cart', { title: 'Carrito', products: cart.products });
  } catch (error) {
    next(error);
  }
});

// Vista de productos
router.get('/products', async (req, res, next) => {
  try {
    const products = await productRepository.getAll(); 
    res.render('products', { title: 'Productos', products });
  } catch (error) {
    next(error);
  }
});

export default router;