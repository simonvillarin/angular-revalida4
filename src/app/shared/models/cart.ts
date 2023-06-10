export interface Cart {
  cartId: number;
  userId: number;
  productId: number;
  productName: string;
  category: string;
  description: string[];
  img: string;
  quantity: number;
  price: number;
}
