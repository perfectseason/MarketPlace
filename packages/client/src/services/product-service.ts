import create from './http-service';

export interface Product {
   id: number;
   name: string;
   description: string;
   price: number;
   image: string;
   stock: number;
   category?: number;
}

const productService = create('/products');

export default productService;
