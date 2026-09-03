import { useState } from 'react';

import orderService, {
   Order,
   CreateOrderData,
} from '../services/order-service';

const useOrders = () => {
   const [orders, setOrders] = useState<Order[]>([]);

   const [isLoading, setIsLoading] = useState(false);

   const [error, setError] = useState('');

   const getOrders = async () => {
      try {
         setIsLoading(true);
         setError('');

         const response = await orderService.getOrders();

         setOrders(response.data);
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to load orders.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const createOrder = async (data: CreateOrderData) => {
      try {
         setIsLoading(true);
         setError('');

         const response = await orderService.createOrder(data);

         return response.data;
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'Unable to create order.'
         );

         throw error;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      orders,
      isLoading,
      error,
      getOrders,
      createOrder,
   };
};

export default useOrders;
