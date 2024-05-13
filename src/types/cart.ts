import { Product } from './projects';

export interface Cart {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
