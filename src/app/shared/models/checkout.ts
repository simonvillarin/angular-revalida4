export interface Checkout {
  checkoutId: number;
  userId: number;
  cartId: number;
  productId: number;
  productName: string;
  category: string;
  description: string[];
  img: string;
  quantity: number;
  price: number;
}
