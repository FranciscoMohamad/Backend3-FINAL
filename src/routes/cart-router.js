import express from 'express';
import passport from '../config/passport-config.js';
import { authorizeRole } from '../middlewares/authorization.js';
import { cartController } from '../controllers/cart-controller.js';

const router = express.Router();

router.get('/:cartId', cartController.getByCartId);
router.post('/', cartController.createCart);

router.post(
  '/:cartId',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('user'),
  cartController.addProduct
);

router.delete('/:cartId/:productId', cartController.removeProduct);
router.delete('/:cartId', cartController.clearCart);

export default router;