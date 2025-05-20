
import { Cart, ICartItem, ICart } from './cart_m';

 export default class cart_service
{
  /**
   * 1. יצירת סל חדש למשתמש
   */
  static async  createCart(userId: string) {
    const cart = await Cart.create({ userId });
    return cart.toJSON();
  }

  /**
   * 2. חיפוש סל קיים לפי userId
   */
  static async  getCartByUser(userId: string) {
    const cart= await Cart.findOne({ userId }).lean();
    return cart;  // יכול להיות null אם לא קיים
  }

  /**
   * 3. הוספת מוצר לסל (אם קיים, מגדילים כמות, אחרת מוסיפים חדש)
   */
  static async  addItemToCart(userId: string, item: ICartItem) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      // אם אין סל קיים, יוצרים חדש עם הפריט
      const newCart = await Cart.create({ userId, items: [item] });
      return newCart.toJSON();
    }
    // מנסים למצוא פריט קיים באותו productId
    const existing = cart.items.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.price = item.price; // עדכון מחיר (אם השתנה)
    } else {
      cart.items.push(item);
    }
    await cart.save();
    return cart.toJSON();
  }

  /**
   * 4. עדכון כמות של מוצר בסל
   */
  static async  updateItemQuantity(
    userId: string,
    productId: string,
    newQuantity: number
  ) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');
    const item = cart.items.find(i => i.productId === productId);
    if (!item) throw new Error('Item not in cart');
    item.quantity = newQuantity;
    await cart.save();
    return cart.toJSON();
  }

  /**
   * 5. מחיקת מוצר מהסל
   */
  static async  removeItemFromCart(
    userId: string,
    productId: string
  ) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');
    cart.items = cart.items.filter(i => i.productId !== productId);
    await cart.save();
    return cart.toJSON();
  }
}
