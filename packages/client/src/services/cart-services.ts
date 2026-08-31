import create from './http-service';

export interface CartItem {
   id: number;
   product: number;
   product_name: string;
   product_image?: string;
   price: number;
   quantity: number;
   subtotal: number;
}

const cartService = create('/cart/items');

export default cartService;
