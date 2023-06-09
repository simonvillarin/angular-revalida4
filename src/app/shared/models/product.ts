export interface Product {
  productId: number;
  productName: string;
  brand: string;
  category: string;
  description: string[];
  quantity: number;
  price: number;
  numOfUserRated: number;
  ratings: number;
  soldItems: number;
  img: string;
  isAvailable: boolean;
}
