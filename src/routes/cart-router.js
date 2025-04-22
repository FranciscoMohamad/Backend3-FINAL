import express from 'express';
import { cartController } from '../controllers/cart-controller.js';

const router = express.Router();

router.get('/:cartId', cartController.getByCartId);
router.post('/', cartController.createCart);
router.post('/:cartId', cartController.addProduct);
router.delete('/:cartId/:productId', cartController.removeProduct);
router.delete('/:cartId', cartController.clearCart);

export default router;