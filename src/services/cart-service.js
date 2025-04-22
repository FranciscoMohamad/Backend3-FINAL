import cartDAO from '../daos/mongodb/cart-dao.js';

class CartService {
  async getCartById(cartId) {
    return await cartDAO.getById(cartId);
  }

  async createCart(data) {
    return await cartDAO.create(data);
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
    return await cartDAO.update(cart._id, cart);
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    return await cartDAO.update(cart._id, cart);
  }
}

export const cartService = new CartService(cartDAO); // Exportación nombrada