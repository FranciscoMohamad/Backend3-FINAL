import { cartService } from '../services/cart-service.js';

class CartController {
  constructor(service) {
    this.service = service;
  }

  getByCartId = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.service.getCartById(cartId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const { userId } = req.body; // El ID del usuario se pasa en el cuerpo de la solicitud
      const response = await this.service.createCart({ userId, products: [] });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.service.addProductToCart(cartId, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  removeProduct = async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const response = await this.service.removeProductFromCart(cartId, productId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.service.clearCart(cartId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController(cartService);