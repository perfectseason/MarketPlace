import { useEffect, useState } from 'react';
import cartService, { PropertyCart } from '../services/cart-service';

const useCart = () => {
   const [cart, setCart] = useState<PropertyCart | null>(null);

   const [isLoading, setIsLoading] = useState(false);

   const [error, setError] = useState('');

   // GET CART
   const loadCart = async () => {
      try {
         setIsLoading(true);
         setError('');

         const response = await cartService.getCart();

         setCart(response.data);
      } catch (error: any) {
         setError(
            error.response?.data?.detail || 'Unable to load saved properties.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // ADD PROPERTY
   const addToCart = async (propertyId: number) => {
      try {
         setIsLoading(true);
         setError('');

         const response = await cartService.addItem(propertyId);

         setCart(response.data);
      } catch (error: any) {
         setError(error.response?.data?.detail || 'Unable to save property.');
      } finally {
         setIsLoading(false);
      }
   };

   // REMOVE PROPERTY
   const removeFromCart = async (itemId: number) => {
      try {
         setIsLoading(true);

         const response = await cartService.removeItem(itemId);

         setCart(response.data);
      } catch (error: any) {
         setError(error.response?.data?.detail || 'Unable to remove property.');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      loadCart();
   }, []);

   return {
      cart,
      addToCart,
      removeFromCart,
      loadCart,
      isLoading,
      error,
   };
};

export default useCart;
