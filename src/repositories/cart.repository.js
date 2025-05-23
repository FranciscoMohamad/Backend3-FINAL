import { cartDao } from '../daos/mongodb/cart-dao.js';
import CustomError from '../utils/custom-error.js';

class CartRepository {
  async getCartById(cartId) {
    const cart = await cartDao.getById(cartId);
    if (!cart) throw new CustomError('Carrito no encontrado', 404);
    return cart;
  }

  async getAllCarts() {
    return await cartDao.getAll();
  }

  async createCart(data) {
    return await cartDao.create(data);
  }

  async addProductToCart(cartId, product) {
    const cart = await this.getCartById(cartId);
    const existingProduct = cart.products.find(p => p.productId.toString() === product.productId);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
    return await cartDao.update(cart._id, cart);
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    return await cartDao.update(cart._id, cart);
  }

  async clearCart(cartId) {
    const cart = await this.getCartById(cartId);
    cart.products = [];
    return await cartDao.update(cart._id, cart);
  }
}

export const cartRepository = new CartRepository();