import { useState } from 'react';

import cartService, { CartItem } from './services/cart-service';

const useCart = () => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);

   const [isLoading, setIsLoading] = useState(false);

   const [error, setError] = useState('');

   // GET CART
   const getCart = async () => {
      try {
         setIsLoading(true);
         setError('');

         const response = await cartService.getCart();

         setCartItems(response.data);
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to load cart.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // ADD TO CART
   const addToCart = async (productId: number, quantity: number = 1) => {
      try {
         setIsLoading(true);
         setError('');

         await cartService.addItem({
            product: productId,
            quantity,
         });

         await getCart();
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to add product to cart.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // UPDATE QUANTITY
   const updateQuantity = async (cartItemId: number, quantity: number) => {
      if (quantity < 1) {
         return;
      }

      try {
         setIsLoading(true);
         setError('');

         await cartService.updateItem(cartItemId, { quantity });

         await getCart();
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to update cart.'
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

         await cartService.removeItem(cartItemId);

         await getCart();
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to remove item.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   // TOTAL ITEMS
   const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
   );

   // TOTAL PRICE
   const totalPrice = cartItems.reduce(
      (total, item) => total + Number(item.subtotal),
      0
   );

   return {
      cartItems,
      totalItems,
      totalPrice,
      isLoading,
      error,
      getCart,
      addToCart,
      updateQuantity,
      removeFromCart,
   };
};

export default useCart;

// import { useEffect, useState } from "react";
// import {
//   cartService,
//   Cart,
// } from "../services/cart-service";

// const useCart = () => {
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loadCart = async () => {
//     try {
//       setIsLoading(true);

//       const response = await cartService.getCart();

//       setCart(response.data);

//     } catch (error: any) {

//       setError(
//         error.response?.data?.detail ||
//         "Unable to load cart."
//       );

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addToCart = async (
//     productId: number,
//     quantity = 1
//   ) => {
//     try {
//       setIsLoading(true);

//       const response =
//         await cartService.addItem(
//           productId,
//           quantity
//         );

//       // THIS IS THE IMPORTANT PART
//       setCart(response.data);

//     } catch (error: any) {

//       setError(
//         error.response?.data?.detail ||
//         "Unable to add item."
//       );

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateQuantity = async (
//     itemId: number,
//     quantity: number
//   ) => {

//     const response =
//       await cartService.updateItem(
//         itemId,
//         quantity
//       );

//     setCart(response.data);
//   };

//   const removeFromCart = async (
//     itemId: number
//   ) => {

//     const response =
//       await cartService.removeItem(itemId);

//     setCart(response.data);
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   return {
//     cart,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     isLoading,
//     error,
//   };
// };

// export default useCart;
