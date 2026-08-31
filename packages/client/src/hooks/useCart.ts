import { useState } from 'react';
import apiClient from '../services/api-client';

export interface CartItem {
   id: number;
   product: number;
   product_name: string;
   product_image?: string;
   price: number;
   quantity: number;
   subtotal: number;
}

const useCart = () => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   // GET CART
   const getCart = async () => {
      try {
         setIsLoading(true);
         setError('');

         const response = await apiClient.get('/cart/');

         setCartItems(response.data);
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to load cart'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // ADD ITEM TO CART
   const addToCart = async (productId: number, quantity: number = 1) => {
      try {
         setIsLoading(true);
         setError('');

         await apiClient.post('/cart/items/', {
            product: productId,
            quantity,
         });

         await getCart();
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to add item to cart'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // UPDATE QUANTITY
   const updateQuantity = async (cartItemId: number, quantity: number) => {
      try {
         setIsLoading(true);
         setError('');

         await apiClient.patch(`/cart/items/${cartItemId}/`, {
            quantity,
         });

         await getCart();
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to update cart'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // REMOVE ITEM
   const removeFromCart = async (cartItemId: number) => {
      try {
         setIsLoading(true);
         setError('');

         await apiClient.delete(`/cart/items/${cartItemId}/`);

         await getCart();
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to remove item'
         );
      } finally {
         setIsLoading(false);
      }
   };

   return {
      cartItems,
      isLoading,
      error,
      getCart,
      addToCart,
      updateQuantity,
      removeFromCart,
   };
};

export default useCart;
