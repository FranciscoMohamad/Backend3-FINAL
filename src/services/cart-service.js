import { cartRepository } from '../repositories/cart.repository.js';

class CartService {
  async getCartById(cartId) {
    return await cartRepository.getById(cartId);
  }

  async createCart(data) {
    return await cartRepository.create(data);
  }

  async addProductToCart(cartId, product) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    const existingProduct = cart.products.find(p => p.productId.toString() === product.productId);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
    return await cartRepository.update(cart._id, cart);
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    return await cartRepository.update(cart._id, cart);
  }
}

export const cartService = new CartService();