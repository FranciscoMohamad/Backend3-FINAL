import { cartRepository } from '../repositories/cart.repository.js';

class CartController {
  constructor(repository) {
    this.repository = repository;
  }

  getByCartId = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.repository.getCartById(cartId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const { userId } = req.body; 
      const response = await this.repository.createCart({ userId, products: [] });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.repository.addProductToCart(cartId, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  removeProduct = async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const response = await this.repository.removeProductFromCart(cartId, productId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const response = await this.repository.clearCart(cartId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController(cartRepository);